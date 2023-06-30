import React from "react";
import { hearts2 } from "../assets";

const Thank = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img
        src={hearts2}
        alt="loader"
        className="w-[100px] h-[100px] object-contain"
      />
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-center text-white">
        Thank you on behalf of all readers and writers on Nov3l! You'll be
        redirected home after a block confirmation.
      </p>
    </div>
  );
};

export default Thank;
