import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

import PostBox from "../../Common/PostBox";
const fetchLikeList = async pageParam => {
  const res = await axios.post(`/api/post/likeorder/${pageParam}`, 1);
  const { Post, isLast } = res.data;
  return { Post, nextPage: pageParam + 1, isLast };
};
const LikeList = () => {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "like",
    ({ pageParam = 1 }) => fetchLikeList(pageParam),
    {
      getNextPageParam: lastPage =>
        !lastPage.isLast ? lastPage.nextPage : undefined
    }
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);
  return (
    <>
      <div>
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.Post.map((posts, index) => (
              <PostBox key={index} posts={posts} index={index}></PostBox>
            ))}
          </React.Fragment>
        ))}
      </div>
      {isFetchingNextPage ? <span>로딩중입니다</span> : <div ref={ref}></div>}
    </>
  );
};
export default LikeList;
