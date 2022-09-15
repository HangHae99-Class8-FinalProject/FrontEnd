import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { postData } from "../Recoil/Atoms/PostData";
import KakaoMap from "../Components/Common/KakaoMap";
import Hashtag from "../Components/PostPage/Hashtag";
import AddPhoto from "../Components/PostPage/AddPhoto";
import AddContent from "../Components/PostPage/AddContent";
import { instance } from "../Utils/Instance";
import Modal from "../Components/RecordPage/Modal";

import { ReactComponent as BackIcon } from "../Icons/BackIcon.svg";

const Post = () => {
  const [merge, setMerge] = useState(false);
  const [post, setPost] = useRecoilState(postData);
  const [showModal, setShowModal] = useState(false);

  const { id: postId } = useParams();

  const navigate = useNavigate();
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
    console.log(post.isLoading, merge);
    if (!post.isLoading && merge) {
      addPosts();
      navigate("/feed");
    }
  }, [post, merge]);

  console.log(post);

  return (
    <>
      <PostHeader>
        <HeaderItems>
          <div>
            <BackIcon />
          </div>
          <div>글쓰기</div>
          <div onClick={onShowModal}>완료</div>
        </HeaderItems>
      </PostHeader>
      <PostBody>
        <PostMap>
          <KakaoMap path={runLog.path} />
        </PostMap>
        <AddPhoto merge={merge} prevImg={runLog.image} />
        <AddContent merge={merge} prevContent={runLog.content} />
        <Hashtag merge={merge} prevHashtag={runLog.hashtag} />
      </PostBody>
      {showModal && (
        <Modal>
          <ModalWrap>
            <p>{postId ? "수정하시겠어요?" : "작성하시겠어요?"}</p>
            <div>
              <button onClick={onCloseModal}>취소</button>
              <button onClick={onClickSubmit}>확인</button>
            </div>
          </ModalWrap>
        </Modal>
      )}
    </>
  );
};

export default Post;

const PostHeader = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0rem;
  height: 4.3rem;
`;

const HeaderItems = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.6rem;
  width: 100%;
  border-bottom: 0.1rem solid #e6e6e6;
  & div {
    font-family: "Noto Sans CJK KR";
    font-size: 1.6rem;
    line-height: 2.3rem;
  }
  & > div:last-child {
    color: #f03800;
  }
`;

const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
`;

const PostMap = styled.div`
  padding: 2rem 2rem 0rem;
`;

const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 1rem;
  justify-content: center;
  align-items: center;
  width: 30.4rem;
  height: 17.4rem;
  & p {
    margin: 4rem 0rem;
  }
  & button {
    border: none;
    background-color: white;
    font-size: 1.6rem;
  }
  & div {
    gap: 10rem;
    display: flex;
  }
`;
