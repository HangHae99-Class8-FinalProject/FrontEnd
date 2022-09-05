import React, { useEffect } from "react";
import { NavState, NavStates } from "../../../Recoil/Atoms/OptionAtoms";
import {
  StyleFeed,
  StyleFrofileBox,
  StyleFrofile,
  StylePath,
  StyleRecord,
  StyleImg
} from "./style";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useRecoilState } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import { useAddTodoMutation } from "../../../Hooks/useLikecheck";
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
  const { mutate } = useAddTodoMutation();
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
  console.log(data);
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
                      <div>프로필사진</div>
                      <span>닉네임</span>
                    </StyleFrofile>
                    <div style={{ display: "flex" }}>
                      <span>조회수:{posts.view}</span>
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
                    <div>거리:{posts.distance}km</div>
                    <div>시간:30분</div>
                  </StyleRecord>
                  <StylePath>
                    <Swiper
                      style={{ height: "200px" }}
                      pagination={{
                        dynamicBullets: true
                      }}
                      modules={[Pagination]}
                    >
                      <SwiperSlide>
                        <StyleImg src="https://www.walkerhillstory.com/wp-content/uploads/2020/09/2-1.jpg"></StyleImg>
                      </SwiperSlide>
                      <SwiperSlide>Slide 2</SwiperSlide>
                      <SwiperSlide>Slide 3</SwiperSlide>
                      <SwiperSlide>Slide 4</SwiperSlide>
                      <SwiperSlide>Slide 5</SwiperSlide>
                      <SwiperSlide>Slide 6</SwiperSlide>
                      <SwiperSlide>Slide 7</SwiperSlide>
                      <SwiperSlide>Slide 8</SwiperSlide>
                      <SwiperSlide>Slide 9</SwiperSlide>
                    </Swiper>
                  </StylePath>
                  <div>
                    <p>{posts.content}</p>
                    <div style={{ display: "flex" }}>
                      {posts.hashtag.map((hash, idx) => (
                        <p key={idx}>#{hash}</p>
                      ))}
                    </div>
                    <div
                      onClick={() => {
                        mutate(posts.postId);
                      }}
                    >
                      {posts.likeDone ? (
                        <span>좋아요완료</span>
                      ) : (
                        <span>좋아요눌러주세요</span>
                      )}{" "}
                      {posts.like}개
                    </div>
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
export default MainList;
