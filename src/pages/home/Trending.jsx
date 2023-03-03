import React, { useState } from "react";
import Carousal from "../../components/Carousal";

import ContentWrapper from "../../components/ContentWrapper";
import useFetch from "../../hooks/useFetch";
import SwitchTabs from "./SwitchTabs";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  
  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week")
  };

  const { data, loading } = useFetch(`/trending/all/${endpoint}`);

  return (
    <section className="relative">
      <ContentWrapper>
        <div className="mt-[20px] flex items-center justify-between pb-[20px]">
          <span className="text-white font-semibold text-2xl">Trending</span>
          <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
        </div>
      </ContentWrapper>
      <Carousal data={data?.results} loading={loading}/>
    </section>
  );
};

export default Trending;
