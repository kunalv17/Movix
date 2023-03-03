import React from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import DetailsBanner from "./DetailsBanner";
import Cast from "../components/Cast";
import VideosSection from "../components/VideosSection";
import Similar from "./Similar";
import Recommendation from "./Recommendation";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)
  
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} /> 
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
    
  );
};

export default Details;
