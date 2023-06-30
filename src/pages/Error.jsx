import React from "react";
import { useNavigate } from "react-router-dom";
import { scared } from "../assets";

const Error = () => {
  // navigate
  const navigate = useNavigate();
  return (
    // wrapper
    <div className="flex flex-col justify-center gap-[20px] h-[60%]">
      <img src={scared} className="h-[5rem]" />
      <p className="font-epilogue font-normal text-[#aaaaaa] text-center">
        Something went wrong. Click{" "}
        <span
          className="text-[#1dc071] cursor-pointer hover:text-[#ffffff] underline"
          onClick={() => navigate("/")}
        >
          here
        </span>{" "}
        to go home.
      </p>
    </div>
  );
};

export default Error;
