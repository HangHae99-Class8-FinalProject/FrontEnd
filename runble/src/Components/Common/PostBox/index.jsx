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
                <StyleHash key={idx}>#{hash}</StyleHash>
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
      </div>
    </StyleFeed>
  );
};
export default PostBox;
