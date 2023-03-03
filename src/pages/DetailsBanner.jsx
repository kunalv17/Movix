import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ContentWrapper from "../components/ContentWrapper";
import useFetch from "../hooks/useFetch";
import Genres from "../components/Genres";
import Img from "../components/Img.jsx";
import PosterFallback from "../assets/no-poster.png";
import { AiOutlinePlayCircle } from "react-icons/all";
import VideoPopup from "../components/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const rating = data?.vote_average?.toFixed(1);
  const { url, genres } = useSelector((state) => state.home);
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");

  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  return (
    <div className="detailsBanner">
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
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="w-[100vw] h-full top-2 left-0 opacity-60 overflow-hidden object-contain relative">
                <div className="h-full">
                  <Img
                    src={
                      url?.backdrop + data?.backdrop_path ||
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/2048px-Solid_white.svg.png"
                    }
                    className='w-[100vw]'
                  />
                </div>
              </div>
              <div className=" w-[100%] h-[56.5vw] bg-gradient-to-t from-[#04152d] via-[#1a1a1a87] to-[#1a1a1a7e]  flex items-center absolute -top-[-47px]  z-0 left-0" />

              <div className=" right-0 bottom-0 left-0 absolute h-[220vw] top-12 md:w-[96vw]  md:h-[53vw] m-4 flex flex-wrap justify-center gap-8 md:gap-0 ">
                <div className="md:absolute  m-8 w-50">
                  <div className="flex justify-evenly flex-col md:flex-row gap-10 ">
                    <div className="md:w-[calc(10vw+600px)] self-center md: justify-self-auto rounded-lg">
                      {data.poster_path ? (
                        <div>
                          <Img
                            src={url?.backdrop + data?.poster_path}
                            className="rounded-xl"
                          />
                        </div>
                      ) : (
                        <Img src={PosterFallback} />
                      )}
                    </div>
                    <div className="mt-4 text-3xl">
                      <div className=" text-white font-bold">
                        {`${data?.name || data?.title} (${dayjs(
                          data?.release_date
                        ).format("YYYY")})`}
                      </div>
                      <div className="text-white text-sm font-normal">
                        {data?.tagline}
                      </div>

                      <div className=" flex gap-1 text-white  justify-start mt-3">
                        {_genres?.map((genre, i) => {
                          if (!genres[genre]?.name) return;
                          return (
                            <div
                              key={i}
                              className="bg-pink-600 text-[12px] whitespace-nowrap p-[1px] px-[6px] rounded-lg h-7 items-center flex  truncate"
                            >
                              {genres?.[genre]?.name}
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex flex-row">
                        <div className="w-12 relative mt-4">
                          <div className="absolute text-white top-[8px] left-[8px] font-medium text-[1rem] backdrop-blur-lg bg-black/40 rounded-full w-8 items-center flex justify-center">
                            {rating}
                          </div>
                          <CircularProgressbar
                            value={rating}
                            maxValue={10}
                            styles={buildStyles({
                              pathColor:
                                rating < 5
                                  ? "red"
                                  : rating < 7
                                  ? "orange"
                                  : "green",
                            })}
                          />
                        </div>
                        <div className="text-white w-auto h-auto flex items-center mt-[11px] ml-4 gap-2">
                          <div
                            onClick={() => {
                              setShow(true);
                              setVideoId(video?.key);
                            }}
                            className=" rounded-full  hover:text-[#dd395f] cursor-pointer"
                          >
                            <AiOutlinePlayCircle className="w-14 h-14" />
                          </div>
                          <span className="text-sm">Watch Trailer</span>
                        </div>
                      </div>
                      <div className="mt-8">
                        <h2 className="text-white font-medium">Overview</h2>
                        <p className="text-white text-sm font-light mt-1">
                          {data?.overview}
                        </p>
                      </div>
                      <div className="flex justify-between items-start mt-6 text-white gap-3">
                        {data?.status && (
                          <div className="flex flex-col">
                            <span className="xs:text-lg text-base">
                              Status:{" "}
                            </span>
                            <span className="xs:text-sm font-light text-xs">
                              {data?.status}
                            </span>
                          </div>
                        )}
                        {data?.release_date && (
                          <div className="flex flex-col">
                            <span className="xs:text-lg text-base">
                              Release Date:{" "}
                            </span>
                            <span className="xs:text-sm font-light text-xs">
                              {dayjs(data?.release_date).format("MMM D, YYYY")}
                            </span>
                          </div>
                        )}
                        {data?.runtime && (
                          <div className="flex flex-col">
                            <span className="xs:text-lg text-base">
                              Runtime:{" "}
                            </span>
                            <span className="xs:text-sm font-light text-xs">
                              {toHoursAndMinutes(data?.runtime)}
                            </span>
                          </div>
                        )}
                      </div>
                      <hr className="my-5 " />
                      {director?.length > 0 && (
                        <div className="items-center">
                          <span className="xs:text-lg text-base text-white">
                            Director : &nbsp;
                          </span>
                          <span className="text-white text-base font-thin">
                            {director?.map((d, i) => (
                              <span key={i} className="text-center">
                                {d?.name}
                                {director?.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                          <hr className=" my-5" />
                        </div>
                      )}
                      {writer?.length > 0 && (
                        <div className="items-center">
                          <span className="xs:text-lg text-base text-white">
                            Writer : &nbsp;
                          </span>
                          <span className="text-white text-base font-thin">
                            {writer?.map((d, i) => (
                              <span key={i} className="text-center">
                                {d?.name}
                                {director?.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                          <hr className=" my-5" />
                        </div>
                      )}
                      {data?.created_by?.length > 0 && (
                        <div className="flex items-center">
                          <span className="xs:text-lg text-base text-white">
                            Creator : &nbsp;
                          </span>
                          <span className="text-white text-base font-thin">
                            {data?.created_by?.map((d, i) => (
                              <span key={i} className="text-center">
                                {d?.name}
                                {data?.created_by?.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                          <hr className=" my-5"/>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#04152d] w-full h-[calc(87vw+600px)] md:hidden"></div>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
