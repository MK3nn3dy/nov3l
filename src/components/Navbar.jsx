import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "./";
import { menu, openScript, profileCat, wallet, redwallet } from "../assets";
import { navlinks } from "../constants";
import { useStateContext } from "../context";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setisActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const { connect, address, setActiveLink, setSearchTerm } = useStateContext();

  return (
    // outer container
    <div className="flex sm:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      {/* full screen navigation */}

      {/* search container */}
      <div className="xs:w-full sm:w-[300px] flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px] items-center">
        <div className="text-[#888888] flex gap-5 w-full">
          <img src={address ? wallet : redwallet} />
          <p>
            {address
              ? address.slice(0, 10) + " ... " + address.slice(-11, -1)
              : "No Wallet Connected"}
          </p>
        </div>
      </div>
      {/* connect button */}
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? "Upload" : "Connect"}
          styles={address ? "bg-[#1dc071]" : "bg-[#FC8BFF] text-[#000000]"}
          handleClick={() => {
            if (address) navigate("create-campaign");
            else connect(); // string for now until implemented
          }}
        />
        <Link to="/profile">
          <div
            onClick={() => {
              setActiveLink("profile");
            }}
            className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer"
          >
            <img
              src={profileCat}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}

      {/* outermost container */}
      <div className="sm:hidden flex justify-between items-center relative">
        {/* thirdweb top left icon on mobile */}
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={openScript}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        {/* mobile menu button (hamburger icon) */}
        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        {/* actual mobile menu */}
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          {/* mobile menu items */}
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                } cursor-pointer`}
                onClick={() => {
                  setisActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? "Upload" : "Connect"}
              styles={address ? "bg-[#1dc071]" : "bg-[#FC8BFF] text-[#000000]"}
              handleClick={() => {
                if (address) navigate("create-campaign");
                else connect(); // string for now until implemented
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
