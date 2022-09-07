import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { NavState, NavStates } from "../../../Recoil/Atoms/OptionAtoms";
import { StyleUserListWrap } from "./style";
import PostBox from "../../Common/PostBox";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

const fetchUserList = async (pageParam, id) => {
  const res = await axios.post(
    `http://54.167.169.43/api/user/post/${id}/${pageParam}`,
    {
      userId: 1
    }
  );
  const { Post, isLast } = res.data;
  return { Post, nextPage: pageParam + 1, isLast };
};
const UserList = () => {
  const { id } = useParams();
  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "user",
    ({ pageParam = 1 }) => fetchUserList(pageParam, id),
    {
      getNextPageParam: lastPage =>
        !lastPage.isLast ? lastPage.nextPage : undefined
    }
  );

  const [show, setShow] = useRecoilState(NavState);
  const [navState, setNavState] = useRecoilState(NavStates);
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);
  return (
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
      {isFetchingNextPage ? <span>로딩중입니다</span> : <div ref={ref}></div>}
    </StyleUserListWrap>
  );
};
export default UserList;
