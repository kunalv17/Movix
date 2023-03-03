import React, { useState } from "react";
import Carousal from "../../components/Carousal";

import ContentWrapper from "../../components/ContentWrapper";
import useFetch from "../../hooks/useFetch";
import SwitchTabs from "./SwitchTabs";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");
  
  const onTabChange = (tab) => {
    setEndpoint(tab === "Movie" ? "movie" : "tv")
  };

  const { data, loading } = useFetch(`/${endpoint}/popular`);

  return (
    <section className="relative">
      <ContentWrapper>
        <div className="mt-[20px] flex items-center justify-between pb-[20px]">
          <span className="text-white font-semibold text-2xl ">What's Popular</span>
          <SwitchTabs data={["Movie", "TV"]} onTabChange={onTabChange} />
        </div>
      </ContentWrapper>
      <Carousal data={data?.results} loading={loading} endpoint={endpoint} />
    </section>
  );
};

export default Popular;
