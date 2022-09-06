import React, { useEffect } from "react";
import { instance } from "../../../Utils/Instance";
import { useQuery } from "react-query";
import useQueryDebounce from "../../../Utils/useQueryDebounce";

const RelatedBar = ({ searchTag }) => {
  console.log("SearchTag:", searchTag);

  const debounceSearch = useQueryDebounce(searchTag, 500);

  const getRelated = async () => {
    const { data } = await instance.get(
      `http://54.167.169.43/api/post/autoSearch/?hashtag=${debounceSearch}`
    );
    console.log("fecthData:", data);
    return data;
  };

  console.log(debounceSearch);

  const { data: related } = useQuery(debounceSearch, getRelated, {
    enabled: !!debounceSearch,
    staleTime: 0
  });

  console.log("queryData:", related);

  return (
    <>
      {related?.map(list => {
        return <div>{list}</div>;
      })}
    </>
  );
};

export default RelatedBar;
