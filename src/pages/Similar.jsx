import React from "react";

import Carousel from "../components/Carousal";
import useFetch from "../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <div className="bg-[#04152d] px-7">
      <Carousel
        title={title}
        data={data?.results}
        loading={loading}
        endpoint={mediaType}
      />
      <hr className="pb-5 mx-5" />
    </div>
  );
};

export default Similar;
