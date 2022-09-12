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
      const { data } = await instance.post("/api/post", post);
      console.log(data);
      return data;
    } else {
      const { data } = await instance.put(`/api/post/${postId}`, post);
      console.log(data);
      return data;
    }
  };

  const onShowModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onClickSubmit = useCallback(() => {
    setPost(prev => ({
      ...prev,
      distance: runLog.distance,
      path: runLog.path,
      time: Time,
      isLoading: true
    }));
    setMerge(true);
  }, [merge, post]);

  useEffect(() => {
    if (!post.isLoading && merge) {
      addPosts();
    }
  }, [post, merge]);

  console.log(post);

  return (
    <>
      {post.isLoading && <div>업로드중...</div>}
      <div>
        {Time.hour} :{Time.minute} :{Time.second}
      </div>
      <div>{runLog.distance}km</div>
      <MapBox>
        <KakaoMap path={runLog.path} />
      </MapBox>
      <AddPhoto merge={merge} prevImg={runLog.image} />
      <Hashtag merge={merge} prevHashtag={runLog.hashtag} />
      <AddContent merge={merge} prevContent={runLog.content} />
      <button onClick={onShowModal}>{postId ? "수정하기" : "작성하기"}</button>
      {showModal && (
        <div>
          {postId ? "수정하시겠어요?" : "작성하시겠어요?"}
          <button onClick={onCloseModal}>취소</button>
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
