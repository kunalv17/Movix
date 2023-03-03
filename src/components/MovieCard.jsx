import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Img from "./Img";
import CircleRating from "./CircleRating";
import Genres from "./Genres";
import PosterFallback from "../assets/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data?.poster_path
    ? url.poster + data?.poster_path
    : PosterFallback;
  return (
    <div
      className="movieCard mb-8"
      onClick={() => navigate(`/${data?.media_type || mediaType}/${data.id}`)}
    >
      <div className="rounded-xl overflow-hidden w-32 relative">
        <Img className="h-[192px] w-[128] rounded-xl" src={posterUrl} />
        {
          <React.Fragment>
            <div className="-mb-2">
              <CircleRating rating={data?.vote_average?.toFixed(1)} />
              <Genres data={data?.genre_ids.slice(0, 2)} />
              <div className="absolute bottom-0 left-0 text-white font-medium text-[0.5rem] backdrop-blur-lg bg-black/40 m-1 rounded-full p-1">
                {data?.vote_average.toFixed(1)}
              </div>
            </div>
          </React.Fragment>
        }
      </div>
      <div className="flex flex-col">
        <span className="text-white truncate w-[128px] p-2 mt-2 text-center bg-[#0e223f] rounded-t-lg">
          {data?.title || data?.name}
        </span>
        <span className="text-white text-xs text-center bg-[#0e223f] rounded-b-lg pb-2 w-[128px]">
          {dayjs(data?.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
