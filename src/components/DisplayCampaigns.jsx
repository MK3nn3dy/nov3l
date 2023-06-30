import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

import { useStateContext } from "../context";
import { loader } from "../assets";
import { FundCard, Filter } from "../components";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  // get navigate function
  const navigate = useNavigate();

  // get search term from context
  const { searchTerm, genreFilter, fictionTypeFilter } = useStateContext();

  console.log("The search term is: ", searchTerm);

  // custom navigate handler to navigate based on campaign clicked and send campaign as state with navigate
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      {/* <h1 className="font-epilogue font-semibold font-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1> */}

      {/* filter component here? Outside of flex container for fundcards */}
      <Filter title={title} count={campaigns.length} />

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {/* show spinner if loading */}
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {/* "No campaigns yet" message if no campaigns and not loading */}
        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not uploaded any scripts yet.
          </p>
        )}
        {/* If not loading and have campaigns, iterate and output */}
        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => {
            if (
              (campaign.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
                searchTerm == "") &&
              (genreFilter.toLowerCase() == campaign.genre.toLowerCase() ||
                genreFilter == "") &&
              (fictionTypeFilter.toLowerCase() ==
                campaign.fictionType.toLowerCase() ||
                fictionTypeFilter == "")
            ) {
              return (
                <FundCard
                  key={v4()}
                  {...campaign}
                  handleClick={() => handleNavigate(campaign)}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
