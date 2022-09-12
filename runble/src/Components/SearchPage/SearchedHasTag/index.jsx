import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { instance } from "../../../Utils/Instance";

import PostBox from "../../Common/PostBox";
import { useInfiniteQuery } from "react-query";

const SearchedHashTag = ({ searhValue }) => {
  const [ref, inView] = useInView();
  const [tap, setTap] = useState("최신순");

  const getSearchHashTagOrder = async pageParam => {
    const { data } = await instance.get(
      `/api/post/search/popular/${pageParam}?hashtag=${searhValue}`
    );
    return data;
  };

  const getSearchHashTagNewest = async pageParam => {
    const { data } = await instance.get(
      `/api/post/search/new/${pageParam}?hastag=${searhValue}`
    );
    return data;
  };

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "searchHastag",
    ({ pageParam = 1 }) =>
      tap === "인기순"
        ? getSearchHashTagOrder(pageParam)
        : getSearchHashTagNewest(pageParam),
    {
      enabled: !!searhValue,
      getNextPageParam: lastPage =>
        !lastPage.isLast ? lastPage.nextPage : undefined
    }
  );

  useEffect(() => {
    if (inView && searhValue) fetchNextPage();
  }, [inView, searhValue]);

  console.log("result:", data);

  return (
    <>
      <button
        onClick={() => {
          setTap("인기순");
        }}
      >
        인기순
      </button>
      <button
        onClick={() => {
          setTap("최신순");
        }}
      >
        최신순
      </button>
      <div>
        {data?.pages.map((page, index) => (
          <div key={index}>
            {page?.Post.map((posts, index) => (
              <PostBox key={index} posts={posts} index={index}></PostBox>
            ))}
          </div>
        ))}
      </div>
      {isFetchingNextPage ? <span>로딩중입니다</span> : <div ref={ref}></div>}
    </>
  );
};

export default SearchedHashTag;
