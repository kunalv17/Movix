import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchDataFromApi } from "../utils/api";
import ContentWrapper from "../components/ContentWrapper";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import noResults from "../assets/no-results.png";
const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res?.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };
  console.log(data);

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="bg-[#04152d] text-white px-2">
      {loading && (
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {!loading && (
        <ContentWrapper>
          <div className="py-10">
            {data?.results?.length > 0 ? (
              <>
                <div className="text-lg font-semibold mb-4 ml-1">
                  {`Search ${
                    data.total_results > 1 ? "results" : "result"
                  } of '${query}'`}
                </div>
                <InfiniteScroll
                  className="flex gap-8 flex-wrap items-start justify-evenly"
                  dataLength={data?.results?.length || []}
                  next={fetchNextPageData}
                  hasMore={pageNum <= data?.total_pages}
                  loader={
                    <div className="w-[100vw] flex items-center justify-center pb-4">
                      <Spinner />
                    </div>
                  }
                >
                  {data?.results?.map((item, index) => {
                    if (item?.media_type === "person") return;
                    return (
                      <MovieCard key={index} data={item} fromSearch={true} />
                    );
                  })}
                </InfiniteScroll>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center h-[100vh]">
                <span className="text-2xl">Sorry Results Not Found!</span>
                <img src={noResults} className="w-96" alt="No results found" />
              </div>
            )}
          </div>
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
