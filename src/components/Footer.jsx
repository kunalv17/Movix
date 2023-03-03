import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "./ContentWrapper";

const Footer = () => {
  return (
    <footer className="footer flex w-full bg-[#020c1b]">
        <div className="flex items-center justify-center">
          <div className="flex flex-col w-[90%] py-8 gap-5 text-white  ">
            <ul className="menuItems flex gap-[calc(2vw+5px)] justify-center text-[0.8rem] xs:text-[1.2rem] w-[93%]">
              <li className="menuItem hover:text-[#ef5c1d] cursor-pointer">
                Terms Of Use
              </li>
              <li className="menuItem hover:text-[#ef5c1d] cursor-pointer">
                Privacy-Policy
              </li>
              <li className="menuItem hover:text-[#ef5c1d] cursor-pointer">
                About
              </li>
              <li className="menuItem hover:text-[#ef5c1d] cursor-pointer">
                Blog
              </li>
              <li className="menuItem hover:text-[#ef5c1d] cursor-pointer">
                FAQ
              </li>
            </ul>
            <div className="infoText text-center xs:text-[0.9rem] text-[0.6rem]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </div>
            <div className="socialIcons flex justify-center gap-12">
              <div className="icon hover:text-[#dd3a5d] cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-[#04152d] hover:bg-[#0e223f]">
                <FaFacebookF />
              </div>
              <div className="icon hover:text-[#dd3a5d] cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-[#04152d] hover:bg-[#0e223f]">
                <FaInstagram />
              </div>
              <div className="icon hover:text-[#dd3a5d] cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-[#04152d] hover:bg-[#0e223f]">
                <FaTwitter />
              </div>
              <div className="icon hover:text-[#dd3a5d] cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-[#04152d] hover:bg-[#0e223f]">
                <FaLinkedin />
              </div>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
