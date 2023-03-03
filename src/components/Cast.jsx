import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import { useSelector } from "react-redux";

import ContentWrapper from "../components/ContentWrapper";
import Img from "../components/Img";
import avatar from "../assets/avatar.png";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  const carousalContainer = useRef();

  const navigation = (dir) => {
    const container = carousalContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth)
        : container.scrollLeft + (container.offsetWidth);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="castSection w-full bg-[#04152d] text-white px-7 pb-5">
      <ContentWrapper>
        <div className="relative">
        <div className="sectionHeading relative text-white font-medium text-3xl mb-6">
          Top Cast
        </div>
        {!loading ? (
          <div className="listItems w-full flex gap-4 overflow-scroll " ref={carousalContainer}>
            {data?.map((item, i) => {
              let imgUrl = item?.profile_path
                ? url?.profile + item?.profile_path
                : avatar;
              return (
                <div key={i} className="flex flex-col">
                  <div className="w-24 mb-1">
                    <Img src={imgUrl} className="rounded-xl w-[96px] h-[144px]" />
                  </div>
                  <div className=" mb-1">{item?.name}</div>
                  <div className="text-xs font-thin">{item?.character}</div>
                </div>
              );
            
            })}
            <BsFillArrowLeftCircleFill
              className="text-black/70 bg-white/40 hover:bg-black rounded-full hover:text-white text-3xl absolute left-0 top-[150px] hidden xs:block"
              onClick={() => {
                navigation("left");
              }}
            />
            <BsFillArrowRightCircleFill
              className="text-black/70 bg-white/40 hover:bg-black rounded-full hover:text-white text-3xl absolute z-10 right-0 top-[150px] hidden xs:block"
              onClick={() => {
                navigation("right");
              }}
            />
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
          )}
          </div>
      </ContentWrapper>
      <hr className="mx-5 mt-5"/>

    </div>
  );
};

export default Cast;
