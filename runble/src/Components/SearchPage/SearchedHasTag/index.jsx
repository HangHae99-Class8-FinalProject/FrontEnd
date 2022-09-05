import React from "react";

const SearchedHashTag = ({ posts }) => {
  return (
    <>
      {posts?.map(list => {
        return <div>{list}</div>;
      })}
    </>
  );
};

export default SearchedHashTag;
