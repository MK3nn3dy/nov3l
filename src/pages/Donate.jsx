import React, { useState } from "react";
import { useStateContext } from "../context";
import { useNavigate } from "react-router-dom";
import { Thank, CustomButton } from "../components";
import { hearts2 } from "../assets";

const Donate = () => {
  // get navigate function
  const navigate = useNavigate();
  // get context
  const { address, donateToSite } = useStateContext();
  // amount state
  const [amount, setAmount] = useState("");
  // loading state
  const [isLoading, setIsLoading] = useState(false);
  // handle donation to site
  const handleDonateToSite = async () => {
    console.log("The amount in the state is: ", amount);
    // check if there's a connected wallet address before any of this
    if (address) {
      setIsLoading(true);
      await donateToSite(amount);
      setIsLoading(false);
      navigate("/");
    } else {
      alert("Please connect Metamask to fund work.");
    }
  };

  return (
    // wrapper
    <div>
      {/* loader */}
      {isLoading && <Thank />}
      <div className="mt-[60px] flex flex-col gap-5">
        <img src={hearts2} className="h-[4rem]" />
        <p className="font-epilogue font-normal text-[#1dc071] my-6 text-center">
          Help us develop in scale and functionality.
        </p>
        <input
          type="number"
          placeholder="ETH 0.1"
          step="0.01"
          className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {address ? (
          <CustomButton
            btnType="button"
            title="Fund"
            styles="w-full bg-[#1dc071] hover:bg-[#FC8BFF] hover:text-black"
            handleClick={handleDonateToSite}
          />
        ) : (
          <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
            <p className="font-epilogue font-normal leading-[22px] text-[#cc9999]">
              Please connect your Metamask wallet to donate to Nov3l.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donate;
