import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";

const About = () => {
  // get navigate function
  const navigate = useNavigate();

  const { activeLink, setActiveLink } = useStateContext();

  return (
    // wrapper
    <div>
      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          {/* story wrapper */}
          <div>
            {/* story heading */}
            <h4 className="font-epilogue font-semibold text-[28px] text-white uppercase">
              About Nov3l
            </h4>
            <h5 className="font-epilogue font-normal text-[#ff7af4] my-6">
              The decentralised fiction library.
            </h5>

            <div className="mt-[20px]">
              {/* warning paragraph */}
              <p className="font-epilogue font-normal text-[16px] text-[#997777] leading-[26px] text-justify">
                Please note that Nov3l currently uses the Sepolia Ethereum test
                net. Work must be funded with Sepolia Ethereum for now.
                Eventually, when we move to the Ethereum main net, all fiction
                uploaded prior will not be available, and any NFTs minted on
                Sepolia will be void. Until we move to the Ethereum main net, it
                is advised you only upload test documents to test the service,
                and do not upload any real work.
              </p>
            </div>

            <div className="mt-[20px]">
              {/* about paragraph */}
              <p className="font-epilogue font-normal text-[16px] text-[#D8D8D8] leading-[26px] text-justify">
                Nov3l aims to become the home of new writing talent. It allows
                writers to share their work and to receive crypto donations from
                people who want to read more fiction like theirs! Work is stored
                on the Filecoin blockchain, which uses the Interplanetary File
                System distributed file storage protocol to split files into
                blocks and store them on multiple storage nodes, increasing
                redundancy. <br />
                <br />
                When work is uploaded, NFTs are minted to the user's address by
                the Nov3l NFT ("NOV") smart contract, to help prove ownership of
                passionately crafted writing. <br />
                <br />
                To upload your work to Nov3l and to receive donations, you must
                first install Metamask. For any would-be members who are new to
                the world of crypto, click{" "}
                <span
                  onClick={() => {
                    navigate("/help");
                    setActiveLink("help");
                  }}
                  className="underline text-[#41cd8d] cursor-pointer"
                >
                  here
                </span>{" "}
                to learn how to set this up!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
