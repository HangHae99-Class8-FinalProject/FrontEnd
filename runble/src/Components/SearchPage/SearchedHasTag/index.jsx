import React from "react";
import { useQuery } from "react-query";

import { instance } from "../../../Utils/Instance";
import PostBox from "../../Common/PostBox";

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
      {data?.Post.map(list => {
        return <PostBox posts={list} />;
      })}
    </>
  );
};

export default SearchedHashTag;
