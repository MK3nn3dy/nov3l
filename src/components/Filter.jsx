import React from "react";
import { useStateContext } from "../context";
import DropDown from "./DropDown";
import { genres, types } from "../constants";
import { useNavigate } from "react-router-dom";
import { search } from "../assets";

const Filter = ({ title, count }) => {
  // get navigate from react-router-dom
  const navigate = useNavigate();
  // get setter functions for genre and type from state
  const {
    setActiveLink,
    searchTerm,
    setSearchTerm,
    genreFilter,
    setGenreFilter,
    fictionTypeFilter,
    setFictionTypeFilter,
  } = useStateContext();

  // onChange handlers
  const handleGenreFilterChange = (e) => {
    // prevent refresh
    e.preventDefault();
    console.log("You changed genre to", e.target.value);
    setGenreFilter(e.target.value);
  };
  const handleTypeFilterChange = (e) => {
    // prevent refresh
    e.preventDefault();
    console.log("You changed type to", e.target.value);
    setFictionTypeFilter(e.target.value);
  };

  return (
    <div
      className="mt-[50px] py-[15px] px-[15px] sm:px-[25px] outline-none 
  font-epilogue font-semibold text-white text-[14px] rounded-[10px] sm:min-w-[300px] bg-[#1c1c24] 
  font-[18px] text-left flex flex-wrap gap-[10px]"
    >
      {/* title of filter box ("all" or "your") */}
      <p>{`${title} (${count})`}</p>

      {/* div containing search bar */}
      <div className="flex flex-col xs:flex-row gap-2 w-[100%] items-center">
        <div className="lg:flex-1 flex flex-row w-full max-w-[600px] py-2 pl-4 pr-2 h-[52px] bg-[#13131a] rounded-[100px]">
          {/* search input */}
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
              navigate("/");
              setActiveLink("dashboard");
            }}
            type="text"
            placeholder="Search for work..."
            className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
          />
          {/* search button (container with image inside) */}
          <div className="w-[72px] h-full rounded-[20px] bg-[#41cd8d] flex justify-center items-center cursor-pointer">
            <img
              src={search}
              alt="search"
              className="w-[15px] h-[15px] object-contain"
            />
          </div>
        </div>
      </div>

      {/* div containing filter buttons */}
      <div className="flex flex-col xs:flex-row gap-2 w-[100%] items-center">
        <DropDown
          options={genres}
          styles="text-[14px]"
          filter="genre"
          handleChange={(e) => handleGenreFilterChange(e)}
          value={genreFilter}
        />
        <DropDown
          options={types}
          styles="text-[14px]"
          filter="type"
          handleChange={(e) => handleTypeFilterChange(e)}
          value={fictionTypeFilter}
        />
      </div>
    </div>
  );
};

export default Filter;
