import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import { postData } from "../Recoil/Atoms/PostData";
import KakaoMap from "../Components/Common/KakaoMap";
import Hashtag from "../Components/PostPage/Hashtag";
import AddPhoto from "../Components/PostPage/AddPhoto";
import AddContent from "../Components/PostPage/AddContent";
import { instance } from "../Utils/Instance";

// http://54.167.169.43
const Post = () => {
  const [merge, setMerge] = useState(false);
  const [post, setPost] = useRecoilState(postData);
  const [showModal, setShowModal] = useState(false);

  const { id: postId } = useParams();

  const location = useLocation();
  const { runLog } = location.state;
  const Time = runLog.time;

  const addPosts = async () => {
    if (!postId) {
      const { data } = await instance.post(
        "http://54.167.169.43/api/post",
        post
      );
      console.log(data);
      return data;
    } else {
      const { data } = await instance.put(
        `http://54.167.169.43/api/post/${postId}`,
        post
      );
      console.log(data);
      return data;
    }
  };

  const onFinish = useCallback(() => {
    setShowModal(true);
    setMerge(true);
  }, []);

  const cancelMerge = useCallback(() => {
    setMerge(false);
  }, []);

  useEffect(() => {
    if (merge) {
      setPost(prev => ({
        ...prev,
        distance: runLog.distance,
        path: runLog.path,
        time: Time
      }));
    }
  }, [merge]);
  const onClickSubmit = useCallback(() => {
    if (post.isCompleted && merge) {
      addPosts();
    }
  }, [merge, post]);

  console.log(post);

  return (
    <>
      <div>
        {Time.hour} :{Time.minute} :{Time.second}
      </div>
      <div>{runLog.distance.toFixed(3)}km</div>
      <MapBox>
        <KakaoMap path={runLog.path} />
      </MapBox>
      <AddPhoto merge={merge} prevImg={runLog.image} />
      <Hashtag merge={merge} prevHashtag={runLog.hashtag} />
      <AddContent merge={merge} prevContent={runLog.content} />
      <button onClick={onFinish}>{postId ? "수정하기" : "작성하기"}</button>
      {showModal && (
        <div>
          {postId ? "수정하시겠어요?" : "작성하시겠어요?"}
          <button onClick={cancelMerge}>취소</button>
          <button onClick={onClickSubmit}>확인</button>
        </div>
      )}
    </>
  );
};

export default Post;

const MapBox = styled.div`
  width: 317px;
  height: 209px;
  left: 29px;
  top: 147px;
`;
