import React, { useRef, useState } from "react";

import { tagType, profileCat } from "../assets";
import { daysLeft } from "../utils";
import standinObject from "../assets/genre";

const FundCard = ({
  owner,
  title,
  genre,
  fictionType,
  description,
  target,
  amountCollected,
  image,
  handleClick,
  tokenId,
}) => {
  // local state
  const [imgUrl, setImageUrl] = useState(image);

  // function to handle failed loading of project image
  // if image passed in is invalid, we set local state to local directory image
  const handleFailedImgSrc = () => {
    let randomIdx = Math.floor(Math.random() * 3);
    let standInImage = standinObject[genre.toLowerCase()][randomIdx];
    setImageUrl(standInImage);
  };

  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
      onClick={handleClick}
    >
      {/* Image */}
      <img
        src={imgUrl}
        alt="fund"
        className="w-full h-[158px] object-cover object-top rounded-[15px]"
        onError={handleFailedImgSrc}
      />
      {/* content */}
      <div className="flex flex-col p-4">
        {/* image and genre */}
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            {genre + ", " + fictionType}
          </p>
        </div>
        {/* title and description */}
        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>
        {/* Amount raised and deadline */}
        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          {/* amount raised */}
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Raised
            </p>
          </div>
          {/* days left */}
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {target}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Target
            </p>
          </div>
        </div>
        {/* owner */}
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={profileCat}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
        {/* Token ID */}
        <div className="flex items-center mt-[20px] gap-[12px]">
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            NFT ID: <span className="text-[#b2b3bd]">{tokenId}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
