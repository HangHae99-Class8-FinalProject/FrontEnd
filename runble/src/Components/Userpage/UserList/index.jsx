import React, { useEffect } from "react";

import { StyleUserListWrap } from "./style";
import useInfinityScroll from "../../../Hooks/useInfinityScroll";
import PostBox from "../../Common/PostBox";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { instance } from "../../../Utils/Instance";

const UserList = () => {
  const { nickname } = useParams();
  console.log(nickname);
  const { ref, inView } = useInView();
  const fetchUserList = async pageParam => {
    const res = await instance.get(`/api/user/post/${nickname}/${pageParam}`);
    const { Post, isLast } = res.data;
    return { Post, nextPage: pageParam + 1, isLast };
  };
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfinityScroll("user", fetchUserList);
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  
  return (
    <>
      <StyleUserListWrap>
        <div>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.Post.map((posts, index) => (
                <PostBox key={index} posts={posts} index={index}></PostBox>
              ))}
            </React.Fragment>
          ))}
        </div>
      </StyleUserListWrap>
      {isFetchingNextPage ? <span>로딩중입니다</span> : <div ref={ref}></div>}
    </>
  );
};
export default UserList;
