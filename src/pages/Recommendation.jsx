// Recommendation

import React from "react";

import Carousel from "../components/Carousal";
import useFetch from "../hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );

  return (
    <div className="bg-[#04152d] px-7">
      <Carousel
        title="Recommendations"
        data={data?.results}
        loading={loading}
        endpoint={mediaType}
      />
    </div>
  );
};

export default Recommendation;
