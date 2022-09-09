import React, { useEffect, useState } from "react";
import { NavState, NavStates } from "../../../Recoil/Atoms/OptionAtoms";

import { NavPostData } from "../../../Recoil/Atoms/OptionAtoms";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useRecoilState } from "recoil";
import PostBox from "../../Common/PostBox";
import useInfinityScroll from "../../../Hooks/useInfinityScroll";

import axios from "axios";
const fetchPostList = async pageParam => {
  const res = await axios.post(
    `http://54.167.169.43/api/post/scroll/${pageParam}`,
    {
      userId: 1
    }
  );
  const { Post, isLast } = res.data;
  return { Post, nextPage: pageParam + 1, isLast };
};
const MainList = () => {
  const [postData, setPostData] = useRecoilState(NavPostData);

  const { ref, inView } = useInView();
  // const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
  //   "posts",
  //   ({ pageParam = 1 }) => fetchPostList(pageParam),
  //   {
  //     getNextPageParam: lastPage =>
  //       !lastPage.isLast ? lastPage.nextPage : undefined,
  //     refetchOnWindowFocus: false
  //   }
  // );

  const [data, status, fetchNextPage, isFetchingNextPage] = useInfinityScroll(
    "posts",
    fetchPostList
  );

  const [show, setShow] = useRecoilState(NavState);
  const [naveState, setnaveState] = useRecoilState(NavStates);
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <>
      <div>
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page?.Post.map((posts, index) => (
              <PostBox key={index} posts={posts} index={index}></PostBox>
            ))}
          </React.Fragment>
        ))}
      </div>
      {isFetchingNextPage ? <span>로딩중입니다</span> : <div ref={ref}></div>}
    </>
  );
};
export default MainList;
