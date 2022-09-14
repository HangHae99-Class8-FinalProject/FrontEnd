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
  StyleContentBox,
  StyleIcon,
  StyleHeart,
  StyleView,
  StyleRecord,
  StyleGood,
  StyleImg,
  StyleHashBox,
  StyleContent,
  StyleHash,
  StyleComment,
  StyleTime
} from "./style";
import { ReactComponent as View } from "../../../icons/view.svg";
import { ReactComponent as Heart } from "../../../icons/heart.svg";
import { ReactComponent as CommentIcon } from "../../../icons/comment.svg";
import { ReactComponent as Profile } from "../../../icons/profile.svg";
import displayedAt from "../../../Utils/displayAt";
import KakaoMap from "../../Common/KakaoMap/index";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useLikeCheck } from "../../../Hooks/useLikecheck";
const PostBox = ({ posts, index }) => {
  const navigate = useNavigate();
  const [show, setShow] = useRecoilState(NavState);
  const [navState, setNaveState] = useRecoilState(NavStates);
  const [postData, setPostData] = useRecoilState(NavPostData);
  const { mutate } = useLikeCheck();
  const accessToken = localStorage.getItem("userData");
  const parseData = JSON.parse(accessToken);
  const nickname = parseData.nickname;
  console.log(posts);
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
      <StyleRecord>
        <div>거리:{posts?.distance}km</div>
        <div>시간:30분</div>
      </StyleRecord>
      <StylePath>
        <Swiper
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
      <StyleContentBox>
        <StyleIcon>
          <StyleHeart>
            <Heart
              onClick={() => {
                mutate(posts.postId);
              }}
            />
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
            navigate(`/reply/${posts.postId}`);
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
