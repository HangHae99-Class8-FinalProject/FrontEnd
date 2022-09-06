import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { NavState, NavStates } from "../../../Recoil/Atoms/OptionAtoms";
import {
  StyleFeed,
  StyleFrofileBox,
  StyleFrofile,
  StylePath,
  StyleRecord
} from "./style";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
const fetchUserList = async pageParam => {
  const res = await axios.get(
    `http://54.167.169.43/api/post/likeorder/${pageParam}`,
    1
  );
  const { Post, isLast } = res.data;
  return { Post, nextPage: pageParam + 1, isLast };
};
const UserList = () => {
  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "user",
    ({ pageParam = 1 }) => fetchUserList(pageParam),
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
    <>
      <div>
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.Post.map((posts, index) => (
              <StyleFeed key={index}>
                <div>
                  <StyleFrofileBox>
                    <StyleFrofile>
                      <div>프로필사진유저페이지</div>
                      <span>닉네임</span>
                    </StyleFrofile>
                    <div style={{ display: "flex" }}>
                      <span>조회수:1</span>
                      <div
                        onClick={() => {
                          setShow(prev => !prev);
                          setNavState("put");
                        }}
                      >
                        ...
                      </div>
                    </div>
                  </StyleFrofileBox>
                  <StyleRecord>
                    <div>거리:4km</div>
                    <div>시간:30분</div>
                  </StyleRecord>
                  <StylePath>거리사진</StylePath>
                  <div>
                    <p>컨텐트</p>
                    <p>#달리기</p>
                    <p>좋아요1개</p>
                    <p>댓글1개모두보기</p>
                  </div>
                </div>
              </StyleFeed>
            ))}
          </React.Fragment>
        ))}
      </div>
      {isFetchingNextPage ? <span>로딩중입니다</span> : <div ref={ref}></div>}
    </>
  );
};
export default UserList;
