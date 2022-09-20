import styled from "styled-components";
import React, { useCallback, useState, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";

import { ReactComponent as ReplyUpdate } from "../../Icons/ReplyUpdate.svg";
import { ReactComponent as ReplyDelete } from "../../Icons/ReplyDelete.svg";

import displayedAt from "../../Utils/displayAt";
import { delRecomment } from "../../Hooks/useRecomment";
import { ReactComponent as Profile } from "../../Icons/myPageProfile.svg";
import { useRecoilState } from "recoil";
import { replyState } from "../../Recoil/Atoms/ReplyAtoms";

function RecommentItem({ data }) {
  const [inputState, setInputState] = useRecoilState(replyState);
  const queryClient = useQueryClient();

  //대댓글 삭제
  const delRecommentData = useMutation(() => delRecomment(data), {
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries("GET_RECOMMENT");
    },
    onError: error => {
      console.log(error);
    }
  });
  //대댓글 삭제 버튼
  const handleDelreply = () => {
    delRecommentData.mutate();
  };

  const onShowEditInput = useCallback(() => {
    setInputState(prev => ({
      ...prev,
      postId: data.commentId,
      recommentId: data.recommentId,
      showInput: "대댓글수정"
    }));
    slideRef.current.style.transform = "translateX(0%)";
  }, []);

  const userData = JSON.parse(window.localStorage.getItem("userData"));

  //슬라이드 만들기

  const slideRef = useRef();
  const [firstTouchX, setFirstTouchX] = useState("");

  const onTouchStart = e => {
    setFirstTouchX(e.changedTouches[0].pageX);
  };

  const onTouchEnd = e => {
    let totalX = e.changedTouches[0].pageX - firstTouchX;
    if (200 > totalX || 400 > totalX > 300) {
      slideRef.current.style.transform = "translateX(-35%)";
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      return;
    }
    if ((totalX < 270 && totalX > 200) || totalX > 400) {
      slideRef.current.style.transform = "translateX(0%)";
      slideRef.current.style.transition = "all 0.5s ease-in-out";
    }
  };

  return (
    <Body nTouchStart={onTouchStart} onTouchEnd={onTouchEnd} ref={slideRef}>
      <RecommentBox>
        <div>{data.image ? <img src={data.image} /> : <Profile />}</div>
        <RecommentBody>
          <Nick>{data.nickname}</Nick>
          <div>{data.comment}</div>
          <RecommentFooter>
            <div>{displayedAt(data.createdAt)}</div>
          </RecommentFooter>
        </RecommentBody>
        {data.nickname === userData.nickname ? (
          <ButtonWrap>
            <button onClick={onShowEditInput}>
              <ReplyUpdate />
            </button>
            <button onClick={handleDelreply}>
              <ReplyDelete />
            </button>
          </ButtonWrap>
        ) : null}
      </RecommentBox>
    </Body>
  );
}

export default RecommentItem;

const Body = styled.div`
  display: flex;
  max-width: 100%;
  margin-left: 3rem;
`;
const CancleButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: 5.4rem;
`;

const Nick = styled.div`
  line-height: 1rem;
  font-family: "Anton";
  font-size: 1.1rem;
  font-weight: 700;
`;
const ButtonWrap = styled.div`
  display: flex;
  margin-left: 0.5rem;
  & button {
    border: none;
  }
  & button:last-child {
    background-color: #f03800;
  }
`;

const RecommentBox = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  padding: 1.5rem 0rem 1.5rem 1.6rem;
  gap: 0.8rem;
  height: 7rem;
  & img {
    width: 4rem;
    height: 4rem;
    border-radius: 10rem;
  }
`;

const RecommentBody = styled.div`
  align-items: flex-start;
  gap: 0.2rem;
  height: 4.2rem;
  width: 26.7rem;
  & div:first-child {
    line-height: 1rem;
  }
`;

const RecommentFooter = styled.div`
  position: relative;
  top: 1.5rem;
  color: #aaa;
`;
