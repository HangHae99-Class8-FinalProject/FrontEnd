import React, { useEffect } from "react";

import { StyleUserListWrap } from "./style";
import useInfinityScroll from "../../../Hooks/useInfinityScroll";
import PostBox from "../../Common/PostBox";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { instance } from "../../../Utils/Instance";

const UserList = ({nickname}) => {
  // const { nickname } = useParams();
  const { ref, inView } = useInView();
  const fetchUserList = async pageParam => {
    const res = await instance.get(`/api/user/post/${nickname}/${pageParam}`);
    const { Post, isLast } = res.data;
    return { Post, nextPage: pageParam + 1, isLast };
  };
  const { data, status, fetchNextPage, isFetchingNextPage ,hasNextPage} = useInfinityScroll("user", fetchUserList);
  console.log(data)

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView,hasNextPage]);

  
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
      {isFetchingNextPage ? <span></span> : <div ref={ref}></div>}
    </>
  );
};
export default UserList;
