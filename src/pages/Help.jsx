import React from "react";

const Help = () => {
  return (
    // wrapper
    <div>
      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          {/* story wrapper */}
          <div>
            {/* story heading */}
            <h4 className="font-epilogue font-semibold text-[28px] text-white uppercase">
              HELP
            </h4>
            <div className="mt-[20px]">
              {/* about - headings and paragraphs */}
              <h5 className="font-epilogue font-normal text-[#FC8BFF] my-6">
                Getting started
              </h5>
              <p className="font-epilogue font-normal text-[16px] text-[#D8D8D8] leading-[26px] text-justify">
                Whilst cryptocurrency, Web3, and decentralised applications
                (dApps) are still relatively new to many users, here, we try to
                make it as easy as possible for any aspiring writers to use our
                service.
              </p>
              <h5 className="font-epilogue font-normal text-[#FC8BFF] my-6">
                Setting up Metamask
              </h5>
              <p className="font-epilogue font-normal text-[16px] text-[#D8D8D8] leading-[26px] text-justify">
                Take a look at the official Metamask setup video below.
              </p>
              {/* flex video container */}
              <div className="flex-[2] flex flex-col gap-[40px] max-w-[500px] mx-auto my-6">
                {/* video frame */}
                <iframe
                  width="100%"
                  height="280px"
                  src="https://www.youtube.com/embed/-HTubEJ61zU"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="font-epilogue font-normal text-[16px] text-[#D8D8D8] leading-[26px] text-justify">
                If you are unable to watch the video above, you can find the
                getting started page for Metamask{" "}
                <a
                  className="underline text-[#41cd8d] cursor-pointer"
                  target="_blank"
                  href="https://support.metamask.io/hc/en-us/articles/360015489531-Getting-started-with-MetaMask"
                >
                  here
                </a>
                .
              </p>
              <h5 className="font-epilogue font-normal text-[#FC8BFF] my-6">
                Connecting
              </h5>
              <p className="font-epilogue font-normal text-[16px] text-[#D8D8D8] leading-[26px] text-justify">
                Once you have set up Metamask, simply click connect at the top
                of the page (or at the bottom of the burger menu on mobile) to
                connect your Metamask wallet to our app. Metamask should open,
                asking you to sign the transaction. Note that no cryptocurrency
                is spent connecting.
              </p>
              <h5 className="font-epilogue font-normal text-[#FC8BFF] my-6">
                Uploading Fiction
              </h5>
              <p className="font-epilogue font-normal text-[16px] text-[#D8D8D8] leading-[26px] text-justify">
                Once your wallet is connected, the connect button will be
                replaced by the "Upload" button. Simply click this button and
                provide the requested information and your fiction in PDF
                format. You'll be prompted by your Metamask wallet to sign the
                transaction. This transaction mints the NFT that helps to prove
                ownership of your work, then adds your work to the contract that
                manages donations. You'll see a loader until the transaction is
                complete, then that's it!
                <br />
                <br />
                Note that if you have multiple accounts on your wallet, you'll
                need to connect the account you want to own the fiction you're
                uploading. You'll also need to use the same account in future to
                see your work on your profile. <br />
                <br />
                After the block confirmation, you'll see your project on the
                home page and profile page, with the PDF available for download.
              </p>
              <h5 className="font-epilogue font-normal text-[#FC8BFF] my-6">
                Viewing Your NFT
              </h5>
              <p className="font-epilogue font-normal text-[16px] text-[#D8D8D8] leading-[26px] text-justify">
                To view the NFT for a particular piece of writing, navigate to
                the page for that piece of work and take note of the "NFT ID".{" "}
                <br />
                <br />
                Next, open Metamask, using the account that owns the NFT, and
                navigate to the "NFTs" tab. Click "Import NFTs". <br />
                <br />
                Add the address that manages Nov3l NFTs -
                0xC659a47E8784Fdd25dA46C8499728a9AFb20F19a - along with your
                Token ID, and click "Import". <br />
                <br />
                That's it! The NFT should now appear under the NFTs tab in your
                Metamask wallet!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
