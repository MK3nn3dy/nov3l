import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";

import { questionCircle, openScript } from "../assets";
import { navlinks } from "../constants";

// create icon component here as it's only used in sidebar
// parenthesis for instant template return
// Disabled is only used for unused buttons - we don't have any now
const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const { activeLink, setActiveLink } = useStateContext();

  const navigate = useNavigate();

  return (
    // outer div
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      {/* home icon */}
      <Link to="/">
        <Icon
          styles="w-[52px] h-[52px] bg-[#2c2f32] rotate-90"
          imgUrl={openScript}
        />
      </Link>
      {/* Other links - outer container */}
      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={activeLink}
              handleClick={() => {
                if (!link.disabled) {
                  setActiveLink(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
        <Icon
          styles="bg-[#1c1c24]"
          name="help"
          isActive={activeLink}
          imgUrl={questionCircle}
          handleClick={() => {
            setActiveLink("help");
            navigate("/help");
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
