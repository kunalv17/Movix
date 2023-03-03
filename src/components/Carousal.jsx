import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "./ContentWrapper";
import Img from "./Img";
import PosterFallback from "../assets/no-poster.png";
import Genres from "./Genres";

import SkItem from "./SkItem";
import CircleRating from "./CircleRating";

const Carousal = ({ data, loading, endpoint, title }) => {
  const carousalContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carousalContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 10)
        : container.scrollLeft + (container.offsetWidth - 10);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div ref={carousalContainer} className="relative pb-6">
      <ContentWrapper>
        <div>
          {title && <div className="text-white font-medium text-3xl mb-6">{title}</div>}
          {!loading ? (
            <span
              className="flex gap-3 overflow-scroll"
              ref={carousalContainer}
            >
              {data?.map((item) => {
                const posterUrl = item?.poster_path
                  ? url.poster + item?.poster_path
                  : PosterFallback;
                return (
                  <div
                    key={item?.id}
                    onClick={() => navigate(`/${item?.media_type || endpoint}/${item?.id}`)}
                  >
                    <div className="h-[190px] rounded-xl overflow-hidden w-32 relative">
                      <Img src={posterUrl} />
                      <CircleRating rating={item?.vote_average.toFixed(1)} />
                      <div className="absolute bottom-0 left-0 text-white font-medium text-[0.5rem] backdrop-blur-lg bg-black/40 m-1 rounded-full p-1">
                        {item?.vote_average.toFixed(1)}
                      </div>
                      <div className="">
                        <Genres data={item?.genre_ids.slice(0, 2)} />
                      </div>
                    </div>
                    <div className="text-white truncate w-[128px] p-2 mt-2 text-center bg-[#0e223f] rounded-t-lg">
                      {item?.title || item?.name}
                    </div>
                    <div className="text-white text-xs text-center bg-[#0e223f] rounded-b-lg pb-2">
                      {dayjs(item.release_date).format("MMM D, YYYY")}
                    </div>
                  </div>
                );
              })}
            </span>
          ) : (
            <span className="flex gap-2 overflow-scroll">
              <SkItem />
              <SkItem />
              <SkItem />
              <SkItem />
              <SkItem />
              <SkItem />
              <SkItem />
            </span>
          )}
          <BsFillArrowLeftCircleFill
            className="text-black/70 bg-white/40 hover:bg-black rounded-full hover:text-white text-3xl z- absolute left-5 top-[calc(50%-15px)] hidden xs:block"
            onClick={() => {
              navigation("left");
            }}
          />
          <BsFillArrowRightCircleFill
            className="text-black/70 bg-white/40 hover:bg-black rounded-full hover:text-white text-3xl absolute z-10 right-5 top-[calc(50%-15px)] hidden xs:block"
            onClick={() => {
              navigation("right");
            }}
          />
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Carousal;
