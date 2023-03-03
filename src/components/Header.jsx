import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import ContentWrapper from "./ContentWrapper";

import logo from "../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
    setTimeout(() => {
      setShowSearch(false);
    }, 1000);
  };

  const navigationHandler = (type) => {
    if (type === "movie") navigate(`/explore/movie`);
    else navigate(`/explore/tv`);
    setMobileMenu(false);
  };

  useEffect(()=>{
    window.scrollTo(0,0);
  },[location])

  return (
    <header className="h-12 justify-center z-20 bg-black/60 backdrop-blur-md pt-1  w-full fixed">
      <ContentWrapper>
        <div className="flex items-center justify-between ">
          <div className="logo" onClick={()=>navigate(`/`)}>
            <img src={logo} alt="logo" className="cursor-pointer"/>
          </div>
          <div className="hidden sm:block">
            <ul className="flex  gap-5 text-white  cursor-pointer">
              <li
                onClick={() => {
                  navigationHandler("movie");
                }}
                className="hover:text-[#ef5c1d]"
              >
                Movies
              </li>
              <li
                onClick={() => {
                  navigationHandler("tv");
                }}
                className="hover:text-[#ef5c1d]"
              >
                TV Shows
              </li>
              <li className="mt-1 hover:text-[#ef5c1d]">
                <HiOutlineSearch
                  onClick={openSearch}
                  className="hover:text-[#ef5c1d]"
                />
              </li>
            </ul>
          </div>
          <div className="sm:hidden">
            <div className="flex text-white gap-5 cursor-pointer">
              <HiOutlineSearch
                onClick={openSearch}
                className={`hover:text-[#ef5c1d]`}
              />
              {mobileMenu ? (
                <VscChromeClose
                  className="hover:text-[#ef5c1d]"
                  onClick={() => setMobileMenu(false)}
                />
              ) : (
                <SlMenu
                  className="hover:text-[#ef5c1d]"
                  onClick={openMobileMenu}
                />
              )}
            </div>
          </div>
        </div>
      </ContentWrapper>
      <div
        className={`absolute -top-28 left-0 w-full z-40 duration-150 ${
          mobileMenu && "translate-y-40"
        }`}
      >
        <ul className="flex flex-col text-white cursor-pointer bg-[#04152d] w-full">
          <li onClick={()=>{
                navigationHandler("movie")
              }} className="w-full hover:bg-[#0e223f] px-6 py-3">Movies</li>
          <li onClick={()=>{
                navigationHandler("tv")
              }} className="w-full hover:bg-[#0e223f] px-6 py-3">TV Shows</li>
        </ul>
      </div>
      <div
        className={`absolute -top-12 z-30 left-0 w-full duration-150 ${
          showSearch && "translate-y-24"
        }`}
      >
        <div className=" flex w-full justify-center ">
          <input
            className="p-3 pl-6 w-full text-white bg-[#04152d] outline-none"
            type="text"
            placeholder="Search for Movies or TV shows..."
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyUp={searchQueryHandler}
          />
          <div className="p-4 bg-[#04152d] text-white">
            <VscChromeClose
              className="hover:text-[#ef5c1d]"
              onClick={() => setShowSearch(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
