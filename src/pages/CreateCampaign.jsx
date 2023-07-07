import React, { useEffect, useState, useRef } from "react";
import { Form, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { money, eth } from "../assets";
import { CustomButton, FormField, Loader, DropDown } from "../components";
import { checkIfImage } from "../utils";

import { genres, types } from "../constants";

const CreateCampaign = () => {
  const navigate = useNavigate();

  const { createCampaign, address } = useStateContext();

  // local state
  // loading
  const [isLoading, setIsLoading] = useState(false);

  // form to send to contract
  const [form, setForm] = useState({
    name: "",
    chainsafeId: "hardcodedChainsafeId",
    title: "",
    genre: "",
    fictionType: "",
    description: "",
    target: "",
    image: "",
  });

  // reference to PDF field to use instead of e.target
  const pdfFileInput = useRef();

  // state for random placeholder name
  let [randomName, setRandomName] = useState("");

  // random author names
  const randomNamesList = [
    "J. K. Rowling",
    "J. R. R. Tolkien",
    "Cormac McCarthy",
    "Margaret Atwood",
    "Stephen King",
    "Dean Koontz",
    "Kurt Vonnegut",
    "Frank Herbert",
    "C. S. Lewis",
    "Suzanne Collins",
  ];

  // variables
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit variable for PDF upload

  // get random number and pick random name on re-renders
  useEffect(() => {
    let randomInt = Math.floor(Math.random() * 10);
    setRandomName(randomNamesList[randomInt]);
  }, []);

  // create and upload URI based on CID passed in
  const createNFTMetadata = async (cid) => {
    try {
      // create object body
      const requestObject = {
        title: form.title,
        address: address,
        cid: cid,
      };

      const requestString = JSON.stringify(requestObject);

      const metadataConfirmation = await fetch(
        "/api/v1/chainsafe/scripts/createmetadata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestString,
        }
      );

      // convert response to object
      let metadataConfirmationObject = await metadataConfirmation.json();

      // return object
      return metadataConfirmationObject;
      // need to return tokenId here to pass to create campaign
    } catch (error) {
      console.log(error);
    }
  };

  // event handlers

  // handle input changes for contract form
  const handleFormFieldChange = (fieldName, e) => {
    const chainsafeId = form.title + " - " + form.name + ".pdf";
    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: e.target.value,
      chainsafeId,
    }));
    // setForm({...form, [fieldName]: e.target.value})
  };

  // handle change of dropdown genre
  const handleGenreChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      genre: e.target.value,
    }));
  };

  // handle change of dropdown type
  const handleTypeChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      fictionType: e.target.value,
    }));
  };

  // handle main submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check image url
    checkIfImage(form.image, async (exists) => {
      // only call create campaign if image url exists
      if (exists) {
        // await PDF upload to IPFS success before adding to campaign contract:
        // PDF UPLOAD

        const fileInput = pdfFileInput.current;
        const file = fileInput.files[0];

        if (!file) {
          console.error("No file selected");
          return;
        }

        if (file.size > MAX_FILE_SIZE) {
          console.log("File too large!");
          return;
        }
        // only set is loading to true after checking for file, format, and size:
        setIsLoading(true);

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function (event) {
          const fileData = event.target.result;
          const formData = new FormData();
          // old line where we used file.name
          // formData.append("file", new Blob([fileData]), file.name);
          formData.append("file", new Blob([fileData]), form.chainsafeId);
          formData.append("path", "/scripto_scripts");
          formData.append("fileName", form.chainsafeId);

          fetch("/api/v1/chainsafe/scripts/upload", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then(async (data) => {
              // the callback in .then() is async so we can await createNFTMetadata and createCampaign in order.
              // check for error code first - this emans it couldn't be saved on chainsafe:
              // data.files_details[0].error_code        409 is conflict - may want to delete file if error so user's name and title isn't taken
              // get CID of the uploaded script to pass to createNFTMetaData
              let cid = data.files_details[0].cid;

              // get backend response object (already an object)
              let metadataConfirmation = await createNFTMetadata(cid);

              // get the cid of the URI JSON metadata file
              let URICid = `https://ipfs.io/ipfs/${metadataConfirmation.files_details[0].cid.toString()}`;

              // create campaign passing in token Id as property to display on site
              await createCampaign({
                owner: address,
                chainsafeId: form.chainsafeId,
                title: form.title,
                genre: form.genre,
                fictionType: form.fictionType,
                description: form.description,
                target: ethers.utils.parseUnits(form.target, 18),
                image: form.image,
                novelTokenUri: URICid,
              });
              setIsLoading(false);
              navigate("/");
            })
            .catch((error) => console.error("Error:", error));
        };

        // ethers.parseUnits is similar to parseEther
        // here we passed in 18 for demimal places into parseUnits instead to get wei
      } else {
        alert("Provide valid image URL");
        // set image input to empty again
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    // outer wrapper
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {/* loader */}
      {isLoading && <Loader />}
      {/* heading for create campaign */}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Upload Work
        </h1>
      </div>

      {/* Create campaign form */}
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        {/* your name and title grouped */}
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder={randomName}
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Title *"
            placeholder="Your fiction's title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>

        {/* two genre inputs - dropdown AND text area that's active when dropdown is "other" */}
        <div className="flex flex-wrap gap-[40px]">
          <DropDown
            value={form.genre}
            handleChange={(e) => handleGenreChange(e)}
            options={genres}
            labelName={"Genre"}
            styles="text-[14px] placeholder:text-[#4b5264] w-full sm:min-w-[300px]"
          />
          <DropDown
            value={form.type}
            handleChange={(e) => handleTypeChange(e)}
            options={types}
            labelName={"Type"}
            styles="text-[14px] placeholder:text-[#4b5264] w-full sm:min-w-[300px]"
          />
        </div>

        {/* the story text area */}
        <FormField
          labelName="Outline *"
          placeholder="Your fiction's outline"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        {/* upload PDF inputs */}

        <label className="flex-1 w-full flex flex-col">
          <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
            Upload your work (PDF) *
          </span>
          <input
            required
            type="file"
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-[#383843] bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-[#4b5264] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-[#1dc071] file:px-3 file:py-[0.32rem] file:text-white file:text-semibold file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] cursor-pointer focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
            ref={pdfFileInput}
          />
        </label>

        {/* you'll get 100% */}
        <div className="w-full flex justify-start items-center p-4 bg-[#444444] h-[120px] rounded-[10px]">
          <img
            src={eth}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[18px] md:text-[25px] text-white ml-[20px]">
            You will get 100% of the donated Ethereum!
          </h4>
        </div>

        {/* goal and end date outer div */}
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="Campaign Image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange("image", e)}
          />
        </div>

        <p className="text-center text-[#cc8899]">
          If an image URL is invalid - or becomes invalid in the future - an AI
          generated genre image will take it's place - these are for the UI only
          and have nothing to do with the minted NFT or ownership.
        </p>

        {/* submit button */}
        <div className="flex justify-center items-center mt-[40px]">
          {address ? (
            <CustomButton
              btnType="submit"
              title="Submit New Script"
              styles="bg-[#1dc071]"
            />
          ) : (
            <button
              className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] bg-[#444444]`}
              disabled
            >
              Please Connect
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
