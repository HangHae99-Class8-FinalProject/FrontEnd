import React, { useEffect } from "react";
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
import { useRecoilState } from "recoil";
import axios from "axios";
const fetchPostList = async pageParam => {
  const res = await axios.post(
    `http://54.167.169.43/api/post/scroll/${pageParam}`,
    1
  );
  const { Post, isLast } = res.data;
  return { Post, nextPage: pageParam + 1, isLast };
};
const MainList = () => {
  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "posts",
    ({ pageParam = 1 }) => fetchPostList(pageParam),
    {
      getNextPageParam: lastPage =>
        !lastPage.isLast ? lastPage.nextPage : undefined
    }
  );
  const [Show, SetShow] = useRecoilState(NavState);
  const [naveState, SetnaveState] = useRecoilState(NavStates);
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);
  return (
    <>
      <div>
        {data?.pages.map((page, index) => (
          <div key={index}>
            {page.Post.map(posts => {
              return (
                <StyleFeed>
                  <div>
                    <StyleFrofileBox>
                      <StyleFrofile>
                        <div>프로필사진</div>
                        <span>닉네임</span>
                      </StyleFrofile>
                      <div style={{ display: "flex" }}>
                        <span>조회수:1</span>
                        <div
                          onClick={() => {
                            SetShow(prev => !prev);
                            SetnaveState("put");
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
              );
            })}
          </div>
        ))}
      </div>
      {isFetchingNextPage ? <span>로딩중입니다</span> : <div ref={ref}></div>}
    </>
  );
};
export default MainList;
