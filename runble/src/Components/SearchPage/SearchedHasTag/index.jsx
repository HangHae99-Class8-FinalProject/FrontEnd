import React from "react";
import { instance } from "../../../Utils/Instance";
import { useQuery } from "react-query";

const SearchedHashTag = ({ searhValue }) => {
  console.log("searchValue:", searhValue);
  const getSearchHashTag = async () => {
    const { data } = await instance.get(
      `http://54.167.169.43/api/post/search?hashtag=${searhValue}`
    );
    return data;
  };

  const { data } = useQuery("searchHastag", getSearchHashTag, {
    enabled: !!searhValue
  });

  console.log("result:", data);

  return (
    <>
      {/* {data?.map(list => {
        return <div>{list}</div>;
      })} */}
      <div>태그</div>
    </>
  );
};

export default SearchedHashTag;
