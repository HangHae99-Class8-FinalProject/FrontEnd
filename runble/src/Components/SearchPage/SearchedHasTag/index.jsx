import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useInView } from "react-intersection-observer";

import { instance } from "../../../Utils/Instance";
import useInfinityScroll from "../../../Hooks/useInfinityScroll";
import PostBox from "../../Common/PostBox";

const SearchedHashTag = ({ searhValue }) => {
  const [ref, inView] = useInView();

  console.log("searchValue:", searhValue);
  const getSearchHashTag = async pageParam => {
    const { data } = await instance.get(
      `http://54.167.169.43/api/post/search/${pageParam}?hashtag=${searhValue}`
    );
    return data;
  };

  const [data, status, fetchNextPage, isFetchingNextPage] = useInfinityScroll(
    "searchHastag",
    getSearchHashTag,
    searhValue
  );

  useEffect(() => {
    if (inView && searhValue) fetchNextPage();
  }, [inView, searhValue]);

  console.log("result:", data);

  return (
    <>
      <div>
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page?.Post.map((posts, index) => (
              <PostBox key={index} posts={posts} index={index}></PostBox>
            ))}
          </Fragment>
        ))}
      </div>
      {isFetchingNextPage ? <span>로딩중입니다</span> : <div ref={ref}></div>}
    </>
  );
};

export default SearchedHashTag;
