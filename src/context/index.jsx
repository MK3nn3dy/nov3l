// imports
import React, { useState, useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { contractABI } from "../constants";

// create context
const StateContext = createContext();

// export provider for context
export const StateContextProvider = ({ children }) => {
  // get fundme contract with useAddress and save to variable
  const { contract } = useContract(
    // newest contract that does everything:
    "0xC659a47E8784Fdd25dA46C8499728a9AFb20F19a",
    contractABI
  );

  // create a write function and give it the createCampaign name / alias,
  // we're destructuring that from useContractWrite, which takes in a contract
  // and the name of the function it's grabbing:
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  // get address of connected wallet account:
  const address = useAddress();

  // get metamask connect function:
  const connect = useMetamask();

  // function to publish campaign:
  const publishCampaign = async (form) => {
    try {
      // This line changed - the array argument used to be passed directly, now the argument is an object with property "args" set to the array
      const data = await createCampaign({
        args: [
          address, // owner, whoever is creating campaign
          form.chainsafeId, // taken from response from IPFS
          form.title,
          form.genre,
          form.fictionType,
          form.description,
          form.target,
          form.image,
          form.novelTokenUri,
        ],
      });

      console.log("Contract call success", data);
    } catch (error) {
      console.log("Contract call failure", error);
    }
  };

  // function to get all campaigns
  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");

    // syntax here is a callback that has instant retern each iteration (parenthesis instead of braces) and within that, braces as we're returning an object each time
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      chainsafeId: campaign.chainsafeStorageId,
      title: campaign.title,
      genre: campaign.genre,
      fictionType: campaign.fictionType,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      tokenId: campaign.tokenId.toNumber(),
      pId: i,
    }));

    return parsedCampaigns;
  };

  // function to get one user's campaigns
  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );
    return filteredCampaigns;
  };

  // function to donate to campaign
  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", [pId], {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  // function to donate to campaign
  const donateToSite = async (amount) => {
    console.log("The amount in donateToSite function is: ", amount);
    const data = await contract.call("donateToSite", [], {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  // function to get all donations
  const getAllDonations = async (pId) => {
    // call contract function with function name and arg
    const donations = await contract.call("getDonators", [pId]);
    // array is returned at 0th index of returned array, so get length of that
    const numberOfDonations = donations[0].length;
    // create an empty array for parsed / formatted donations
    const parsedDonations = [];

    // loop for number of donations and push formatted object to parsed donations
    // donations[0] is an array of the donator addresses, so [0][i] is the donator on each iteration
    // donations[1] is an array of the donation amounts, so [1][i] is the amount on each iteration
    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  // context state for active link
  const [activeLink, setActiveLink] = useState("dashboard");

  // context state for search term
  const [searchTerm, setSearchTerm] = useState("");

  // context state for genre
  const [genreFilter, setGenreFilter] = useState("");

  // context state for type
  const [fictionTypeFilter, setFictionTypeFilter] = useState("");

  // what we actually return - the context wrapper, the value being the object we can destructure from when we run useStateContext()
  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        donateToSite,
        getAllDonations,
        activeLink,
        setActiveLink,
        searchTerm,
        setSearchTerm,
        genreFilter,
        setGenreFilter,
        fictionTypeFilter,
        setFictionTypeFilter,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// export a function that calls useContext with this StateContext
// I think NN made this hook in a separate file by importing the context
export const useStateContext = () => useContext(StateContext);
