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
  StyleFrofileImg,
  StyleFrofile,
  StylePath,
  StyleRecord,
  StyleImg,
  StyleHashBox,
  StyleHash
} from "./style";
import KakaoMap from "../../Common/KakaoMap/index";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useLikeCheck } from "../../../Hooks/useLikeCheck";
const PostBox = ({ posts, index }) => {
  const navigate = useNavigate();
  const [show, setShow] = useRecoilState(NavState);
  const [naveState, setnaveState] = useRecoilState(NavStates);
  const [postData, setPostData] = useRecoilState(NavPostData);
  const { mutate } = useLikeCheck();

  function displayedAt(createdAt) {
    const today = new Date(createdAt);
    const milliSeconds = new Date() - new Date(createdAt);
    // console.log(milliSeconds);
    const seconds = milliSeconds / 1000;
    // console.log(seconds);
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    // console.log(minutes);
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;

    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    console.log(days);
    if (days < 2) return `${Math.floor(days)}일 전`;
    if (days >= 2) return;
    `${today.getMonth() + 1 + "월" + today.getDate() + "일"}`;
  }

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
              <StyleFrofileImg alt="프로필사진"></StyleFrofileImg>
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
            {posts.image.map((img, index) => (
              <SwiperSlide key={index}>
                <StyleImg src={img} alt="img"></StyleImg>
              </SwiperSlide>
            ))}
          </Swiper>
        </StylePath>
        <div>
          <p>{posts?.content}</p>
          <StyleHashBox>
            <div style={{ display: "flex" }}>
              {posts?.hashtag.map((hash, idx) => (
                <StyleHash key={idx}>
                  <span>#{hash}</span>
                </StyleHash>
              ))}
            </div>
            <div
              onClick={() => {
                mutate(posts.postId);
              }}
            >
              좋아요버튼
            </div>
          </StyleHashBox>
          <div>
            좋아요
            {posts.like}개
          </div>
          <p>
            댓글1개<span>모두보기</span>
          </p>
        </div>
        {displayedAt(posts.createdAt)}
      </div>
    </StyleFeed>
  );
};
export default PostBox;
