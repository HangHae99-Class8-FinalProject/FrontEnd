import React from "react";
import { instance } from "../../../Utils/Instance";
import { useQuery } from "react-query";

const RelatedBar = ({ searchTag }) => {
  const getRelated = async () => {
    const { data } = await instance.get(
      `http://54.167.169.43/api/post/autoSearch/?hashtag=${searchTag}`
    );
    console.log(data);
    return data;
  };

  const { data: related } = useQuery("related", getRelated, {
    enabled: !!searchTag
  });

  return (
    <>
      {related?.map(list => {
        return <div>{list}</div>;
      })}
    </>
  );
};

export default RelatedBar;
