import React from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  NavState,
  NavStates,
  NavPostData
} from "../../../Recoil/Atoms/OptionAtoms";
import {
  StyleFeed,
  StyleFrofileBox,
  StyleFrofile,
  StylePath,
  StyleRecord,
  StyleImg
} from "./style";
import KakaoMap from "../../Common/KakaoMap/index";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useLikeCheck } from "../../../Hooks/useLikecheck";
const PostBox = ({ posts, index }) => {
  const navigate = useNavigate();
  const [show, setShow] = useRecoilState(NavState);
  const [naveState, setnaveState] = useRecoilState(NavStates);
  const [postData, setPostData] = useRecoilState(NavPostData);
  const { mutate } = useLikeCheck();
  return (
    <StyleFeed key={index}>
      <div>
        <StyleFrofileBox>
          <StyleFrofile>
            <div
              onClick={() => {
                setPostData(posts);
                navigate(`/user/${posts.nickname}`);
              }}
            >
              프로필사진
            </div>
            <span>{posts.nickname}</span>
          </StyleFrofile>
          <div style={{ display: "flex" }}>
            <div>
              조회수:<span>{posts?.view}</span>
            </div>
            <div
              onClick={() => {
                setShow(prev => !prev);
                setnaveState("put");
                setPostData(posts);
              }}
            >
              ...
            </div>
          </div>
        </StyleFrofileBox>
        <StyleRecord>
          <div>거리:{posts?.distance}km</div>
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
              <KakaoMap path={posts.path}></KakaoMap>
            </SwiperSlide>
            <SwiperSlide></SwiperSlide>
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
          <p>{posts?.content}</p>
          <div style={{ display: "flex" }}>
            {posts?.hashtag.map((hash, idx) => (
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
            )}
            {posts.like}개
          </div>
          <p>댓글1개모두보기</p>
        </div>
      </div>
    </StyleFeed>
  );
};
export default PostBox;
