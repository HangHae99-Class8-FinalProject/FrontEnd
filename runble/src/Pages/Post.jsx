import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useMutation } from "react-query";

import { postData } from "../Recoil/Atoms/PostData";
import KakaoMap from "../Components/Common/KakaoMap";
import Hashtag from "../Components/PostPage/Hashtag";
import AddPhoto from "../Components/PostPage/AddPhoto";
import AddContent from "../Components/PostPage/AddContent";
import { instance } from "../Utils/Instance";

// http://54.167.169.43
const Post = ({ props }) => {
  const [merge, setMerge] = useState(false);
  const [post, setPost] = useRecoilState(postData);
  const [showModal, setShowModal] = useState(false);

  const { id: postId } = useParams();

  console.log("post:", post);

  const location = useLocation();
  const runLog = props || location.state.runLog;
  const Time = runLog.time;

  const addPosts = async () => {
    if (!props) {
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

  const onFrinish = useCallback(() => {
    setShowModal(true);
  }, []);

  useEffect(() => {
    if (post.isCompleted) {
      addPosts();
    }
  }, [post]);

  const cancelMerge = useCallback(() => {
    setMerge(false);
  }, []);

  const onClickSubmit = useCallback(() => {
    setMerge(true);
    if (merge) {
      setPost(prev => ({
        ...prev,
        distance: runLog.distance,
        path: runLog.path,
        time: Time
      }));
    }
  }, [merge]);

  console.log(postData);
  return (
    <>
      <div>
        {Time.hour} :{Time.minute} :{Time.second}
      </div>
      <div>{runLog.distance.toFixed(3)}km</div>
      <MapBox>
        <KakaoMap path={runLog.path} />
      </MapBox>
      <AddPhoto merge={merge} />
      <Hashtag merge={merge} />
      <AddContent merge={merge} />
      <button onClick={onFrinish}>작성하기</button>
      {showModal && (
        <div>
          작성하시겠습니까?
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
