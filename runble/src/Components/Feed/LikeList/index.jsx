import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { NavState, NavStates } from "../../../Recoil/Atoms/OptionAtoms";
import {
  StyleFeed,
  StyleFrofileBox,
  StyleFrofile,
  StylePath,
  StyleRecord,
  StyleImg
} from "./style";
import { useAddTodoMutation } from "../../../Hooks/useLikecheck";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
const fetchLikeList = async pageParam => {
  const res = await axios.post(
    `http://54.167.169.43/api/post/likeorder/${pageParam}`,
    1
  );
  const { Post, isLast } = res.data;
  return { Post, nextPage: pageParam + 1, isLast };
};
const LikeList = () => {
  const { mutate } = useAddTodoMutation();
  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "like",
    ({ pageParam = 1 }) => fetchLikeList(pageParam),
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
          <React.Fragment key={index}>
            {page.Post.map((posts, index) => (
              <StyleFeed key={index}>
                <div>
                  <StyleFrofileBox>
                    <StyleFrofile>
                      <div>프로필사진좋아요순</div>
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
                    <div>거리:{posts.distance}</div>
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
                    <div style={{ display: "flex" }}>
                      {posts.hashtag.map((hash, idx) => (
                        <p key={idx}>#{hash}</p>
                      ))}
                    </div>
                    <p
                      onClick={() => {
                        mutate(posts.postId);
                      }}
                    >
                      좋아요 {posts.like}개
                    </p>
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
export default LikeList;
