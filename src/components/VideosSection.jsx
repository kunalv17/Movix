import React, { useState, useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import ContentWrapper from "../components/ContentWrapper";
import VideoPopup from "../components/VideoPopup";
import Img from "../components/Img";
import { AiOutlinePlayCircle } from "react-icons/ai";
const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
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
    <div className="videosSection bg-[#04152d] text-white flex px-7">
      <div
        className={`z-40 fixed top-0 bottom-0 right-0 left-0 ${
          show ? "block" : "hidden"
        }`}
      >
        <VideoPopup
          show={show}
          setShow={setShow}
          videoId={videoId}
          setVideoId={setVideoId}
        />
      </div>
      <ContentWrapper>
        <div className="relative">
        <div className="sectionHeading text-white font-medium text-3xl mb-6 ">
          Official Videos
        </div>
        {!loading ? (
          <div className="videos flex w-full gap-4 overflow-scroll " ref={carousalContainer}>
            {data?.results?.map((video) => (
              <div
                key={video?.id}
                onClick={() => {
                  setVideoId(video?.key);
                  setShow(true);
                }}
              >
                <div className="relative w-44">
                  <Img
                    className=""
                    src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`}
                  />
                  <div className="text-white w-auto h-auto flex items-center mt-[11px] ml-4 gap-2">
                    <div
                      onClick={() => {
                        setShow(true);
                        setVideoId(video?.key);
                      }}
                      className="absolute rounded-full top-[21.5px] left-[60px] hover:text-[#dd395f] cursor-pointer"
                    >
                      <AiOutlinePlayCircle className="w-14 h-14" />
                    </div>
                  </div>
                  <div className="text-white font-light text-xs mb-5">
                    {video?.name}
                  </div>
                </div>
              </div>
            ))}
            <BsFillArrowLeftCircleFill
              className="text-black/70 bg-white/40 hover:bg-black rounded-full hover:text-white text-3xl absolute left-0 top-[95px] hidden xs:block"
              onClick={() => {
                navigation("left");
              }}
            />
            <BsFillArrowRightCircleFill
              className="text-black/70 bg-white/40 hover:bg-black rounded-full hover:text-white text-3xl absolute z-10 right-1 top-[95px] hidden xs:block"
              onClick={() => {
                navigation("right");
              }}
            />
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
          <hr className=" my-5" />
        </div>
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
