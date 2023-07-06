import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 } from "uuid";

import { useStateContext } from "../context";
import { CustomButton, CountBox, Loader } from "../components";
import { calculateBarPercentage } from "../utils";

// import local standin images
import { profileCat, tagType } from "../assets";
import standinObject from "../assets/genre";

const CampaignDetails = () => {
  // get the state (campaign) sent with the routing (from clicking campaign FundCard)
  const { state } = useLocation();
  // get navigate object
  const navigate = useNavigate();
  // get functions from context
  const { getAllDonations, contract, address, donate } = useStateContext();
  // local state
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const [imgUrl, setImageUrl] = useState(state.image);

  // function to get donators for a given campaign ID
  const fetchDonators = async () => {
    const data = await getAllDonations(state.pId);
    setDonators(data);
  };

  // useEffect calls getDonators as soon as the page loads:
  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  // function to call donate function from context index.js
  const handleDonate = async () => {
    // check if there's a connected wallet address before any of this
    if (address) {
      setIsLoading(true);
      await donate(state.pId, amount);
      setIsLoading(false);
      navigate("/");
    } else {
      alert("Please connect Metamask to fund work.");
    }
  };

  // function to handle failure of img src and replace with local directory img path
  const handleImgSrcFailure = () => {
    let randomIdx = Math.floor(Math.random() * 3);
    let standInImage = standinObject[state.genre.toLowerCase()][randomIdx];
    setImageUrl(standInImage);
  };

  // function to download pdf based on campaignDetails page we're on:
  const downloadPDF = async () => {
    // response from local backend
    let response = await fetch(
      `/api/v1/chainsafe/scripts/download/${state.chainsafeId}`
    );
    // convert to blob
    let blob = await response.blob();
    // get URL for blob
    let pdfBlobUrl = window.URL.createObjectURL(blob);
    // create a tag to simulate click on
    const link = document.createElement("a");
    // set href to blob url
    link.href = pdfBlobUrl;
    // set name in response to name of file downloaded
    link.setAttribute("download", `${state.chainsafeId}.pdf`);
    // append link to body
    document.body.appendChild(link);
    // simulate click
    link.click();
  };

  return (
    <div>
      {/* loader */}
      {isLoading && <Loader />}
      {/* upper content */}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        {/* image and percentage */}
        <div className="flex-1 flex-col relative">
          {/* title above image */}
          <div className="absolute top-[1rem] p-2 bg-gradient-to-r from-[#13131a] to-transparent">
            {/* creator title above image */}
            <h4 className="font-epilogue font-semibold text-[22px] text-white uppercase">
              {state.title}
            </h4>
            {/* genre and type above image */}
            <div className="flex flex-row items-center">
              <img
                src={tagType}
                alt="tag"
                className="w-[17px] h-[17px] object-contain"
              />
              <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-white">
                {state.genre + ", " + state.fictionType}
              </p>
            </div>
          </div>
          {/* image */}
          <img
            src={imgUrl}
            alt="campaign"
            className="w-full h-[410px] object-cover object-top rounded-xl bg-local"
            onError={handleImgSrcFailure}
          />
          {/* percentage container */}
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            {/* percentage bar */}
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>
        {/* wrapper for days left, raised, and backers stats on right hand side */}
        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Target" value={state.target} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>
      {/* Description, owner, etc - large section below upper content */}
      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        {/* creator wrapper */}
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            {/* creator title */}
            <h4 className="font-epilogue font-semibold text-[22px] text-white uppercase">
              {state.title}
            </h4>
            {/* genre and type */}
            <div className="flex flex-row items-center mb-[6px] sm:mb-[18px]">
              <img
                src={tagType}
                alt="tag"
                className="w-[17px] h-[17px] object-contain"
              />
              <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
                {state.genre + ", " + state.fictionType}
              </p>
            </div>
            {/* creator icon and address wrapper*/}
            <div className="mt-[6px] sm:mt-[20px] flex flex-row items-center flex-wrap gap-[20px]">
              {/* image */}
              <div className="h-[52px] w-[52px] hidden sm:flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={profileCat}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              {/* stats */}
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] sm:text-white text-[#808191] break-all">
                  <span className="text-[#888888] mr-2">by</span> {state.owner}
                </h4>
              </div>
            </div>
            {/* NFT ID */}
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase mt-10">
              NFT ID
            </h4>
            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#ff7af4] leading-[26px] text-justify">
                {state.tokenId}
              </p>
            </div>
          </div>

          {/* story wrapper */}
          <div>
            {/* story heading */}
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Synopsis
            </h4>
            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
            {/* Download single PDF button */}
            <CustomButton
              btnType="button"
              title="Download PDF"
              styles="bg-[#1dc071] mt-[26px] hover:bg-[#FC8BFF] hover:text-black"
              handleClick={async () => {
                downloadPDF();
              }}
            />
          </div>

          {/* story wrapper */}
          <div>
            {/* Donators heading */}
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Donators
            </h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={v4()}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px]">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet. Be the first!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* donate section wrapper */}
        <div className="flex-1">
          {/* fund section title */}
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            Fund
          </h4>
          {/* fund form wrapper */}
          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            {/* smaller form title */}
            <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the Fiction!
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Back it to help them keep writing.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  The reward is more of the fiction you{" "}
                  <span className="text-[#FC8BFF]">love!</span>
                </p>
              </div>
              {address ? (
                <CustomButton
                  btnType="button"
                  title="Fund"
                  styles="w-full bg-[#1dc071] hover:bg-[#FC8BFF] hover:text-black"
                  handleClick={handleDonate}
                />
              ) : (
                <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                  <p className="font-epilogue font-normal leading-[22px] text-[#cc9999]">
                    Please connect your Metamask wallet to fund this work.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
