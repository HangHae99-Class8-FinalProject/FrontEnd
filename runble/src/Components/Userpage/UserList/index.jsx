import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { NavState, NavStates } from "../../../Recoil/Atoms/OptionAtoms";
import { StyleUserListWrap } from "./style";
import useInfinityScroll from "../../../Hooks/useInfinityScroll";
import PostBox from "../../Common/PostBox";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { instance } from "../../../Utils/Instance";

const UserList = () => {
  // const { ninkname } = useParams();
  const { ref, inView } = useInView();
  const accessToken = localStorage.getItem("userData");
  const parseData = JSON.parse(accessToken);
  const nickname = parseData.nickname;
  const fetchUserList = async pageParam => {
    console.log(nickname);
    const { data } = await instance.get(
      `http://54.167.169.43/api/user/post/${nickname}/${pageParam}`
    );
    return data;
  };
  const [data, status, fetchNextPage, isFetchingNextPage] = useInfinityScroll(
    "user",
    fetchUserList,
    nickname
  );

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
