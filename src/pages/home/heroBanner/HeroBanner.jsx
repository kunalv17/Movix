import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/Img";
import ContentWrapper from "../../../components/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/upcoming");

  const { url } = useSelector((state) => state?.home);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const setButton = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  useEffect(() => {
    const bg =
      url?.backdrop +
      data?.results?.[Math.floor(Math.random() * 19)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  return (
    <div className="">
      <div className="w-[calc(100vw)] h-full top-0 left-0 opacity-60 overflow-hidden object-contain relative">
        <Img
          src={
            background ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/2048px-Solid_white.svg.png"
          }
        />
      </div>
      <div className=" w-[100%] h-[56.7vw] bg-gradient-to-t from-[#04152d] via-[#1a1a1a87] to-[#1a1a1a7e]  flex items-center absolute -top-[-48px]  z-0 left-0" />
      <ContentWrapper>
        <div className=" flex flex-col justify-center items-center absolute top-0 left-0 w-full mt-[calc(15%+50px)]">
          <span
            className=" font-semibold text-[3rem]
          xs:text-[3rem] sm:text-[4rem] md:text-[6rem] lg-text-[8rem] xl-text-[11rem] bg-gradient-to-r from-[#f79b03] to-[#dd3a5f] bg-clip-text text-transparent"
          >
            Welcome
          </span>
          <span className="text-sm h-6 xs:text-[0.7rem] sm:text-[1rem] md:text-[1.5rem] lg-text-[2rem] xl-text-[3rem] bg-gradient-to-r from-[#f79b03] to-[#dd3a5f] bg-clip-text text-transparent">
            Millions of Movies, TV shows and people to discover.
          </span>
          <div className=" flex md:mt-8 w-full justify-center mt-4 ">
            <input
              className="w-[55%] h-8 md:h-12 pl-5 outline-none
            text-[.8rem] sm:text-[1rem] xl:text-[1.8rem] rounded-tl-3xl rounded-bl-3xl text-gray-800"
              type="text"
              placeholder="Search for Movies or TV shows..."
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyUp={searchQueryHandler}
            />
            <button
              className="px-4 h-8 md:h-12 text-[.8rem] sm:text-[1rem] xl:text-[1.8rem] rounded-tr-3xl rounded-br-3xl
            bg-gradient-to-r
            from-[#FF8008] to-[#dd3a5d]
            text-white font-semibold
            "
              onClick={() => {
                setButton();
              }}
            >
              Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;

//#f79b03
//#dd3a5f
