import React from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { NavState, NavStates, NavPostData } from "../../../Recoil/Atoms/OptionAtoms";
import {
  StyleFeed,
  StyleFrofileBox,
  StyleFrofileImg,
  StyleFrofile,
  StylePath,
  StyleContentBox,
  StyleIcon,
  StyleHeart,
  StyleView,
  StyleSpeed,
  StyleGood,
  StyleImg,
  StyleHashBox,
  StyleContent,
  StyleHash,
  StyleComment,
  StyleTime
} from "./style";
import { ReactComponent as View } from "../../../Icons/view.svg";
import { ReactComponent as Heart } from "../../../Icons/heart.svg";
import { ReactComponent as CommentIcon } from "../../../Icons/comment.svg";
import { ReactComponent as Profile } from "../../../Icons/profile.svg";
import displayedAt from "../../../Utils/displayAt";
import KakaoMap from "../../Common/KakaoMap/index";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useLikeCheck } from "../../../Hooks/useLikecheck";
import { useState } from "react";
const PostBox = ({ posts, index }) => {
  const navigate = useNavigate();
  const [show, setShow] = useRecoilState(NavState);
  const [navState, setNaveState] = useRecoilState(NavStates);
  const [postData, setPostData] = useRecoilState(NavPostData);
  const { mutate } = useLikeCheck();
  const accessToken = localStorage.getItem("userData");
  const parseData = JSON.parse(accessToken);
  const nickname = parseData.nickname;
  const [heart, Setheart] = useState(false);
  return (
    <StyleFeed key={index}>
      <StyleFrofileBox>
        <StyleFrofile>
          {posts.profile === null ? (
            <Profile
              onClick={() => {
                setPostData(posts);
                navigate(`/user/${posts.nickname}`, {
                  state: { nickname: posts.nickname, profile: posts.profile }
                });
              }}
            />
          ) : (
            <StyleFrofileImg
              onClick={() => {
                setPostData(posts);
                navigate(`/user/${posts.nickname}`, {
                  state: { nickname: posts.nickname, profile: posts.profile }
                });
              }}
              src={posts.profile}
            ></StyleFrofileImg>
          )}
          <div></div>
          <span>{posts.nickname}</span>
        </StyleFrofile>
        <div style={{ display: "flex" }}>
          {nickname === posts.nickname ? (
            <div
              onClick={() => {
                setShow(prev => !prev);
                setNaveState("put");
                setPostData(posts);
              }}
            >
              ...
            </div>
          ) : null}
        </div>
      </StyleFrofileBox>
      <StylePath>
        <Swiper
          pagination={{
            dynamicBullets: true
          }}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <StyleSpeed>
              <div>
                <div>2.04k</div>
                <div>00:12:23</div>
              </div>
            </StyleSpeed>
            <KakaoMap path={posts.path}></KakaoMap>
          </SwiperSlide>
          {posts.image.map((img, index) => (
            <SwiperSlide key={index}>
              <StyleImg src={img} alt="img"></StyleImg>
            </SwiperSlide>
          ))}
        </Swiper>
      </StylePath>
      <StyleContentBox>
        <StyleIcon>
          <StyleHeart>
            {heart ? (
              <Heart
                fill="red"
                onClick={() => {
                  mutate(posts.postId);
                  Setheart(prev => !prev);
                }}
              />
            ) : (
              <Heart
                stroke="black"
                onClick={() => {
                  mutate(posts.postId);
                  Setheart(prev => !prev);
                }}
              />
            )}
            <CommentIcon />
          </StyleHeart>
          <StyleView>
            <View />
            <span>{posts?.view}</span>
          </StyleView>
        </StyleIcon>
        <StyleContent>{posts?.content}</StyleContent>
        <StyleHashBox>
          {posts?.hashtag.map((hash, idx) => (
            <StyleHash key={idx}>
              <span>#{hash}</span>
            </StyleHash>
          ))}
        </StyleHashBox>
        <StyleGood>
          좋아요
          {posts.like}개
        </StyleGood>
        <StyleComment
          onClick={() => {
            navigate(`/reply/${posts.postId}`,{
              state: {
                nickname:posts.nickname,
                profile:posts.profile,
                content:posts.content,
                createdAt:posts.createdAt,
                like:posts.like   
              }
            });
          }}
        >
          댓글{posts.commentNum}개모두보기
        </StyleComment>
        <StyleTime>{displayedAt(posts.createdAt)}</StyleTime>
      </StyleContentBox>
    </StyleFeed>
  );
};
export default PostBox;
