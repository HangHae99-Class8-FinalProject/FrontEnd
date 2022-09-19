import React, { useCallback, useState, useRef, useLayoutEffect, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";

import { ReactComponent as ReplyUpdate } from "../../Icons/ReplyUpdate.svg";
import { ReactComponent as ReplyDelete } from "../../Icons/ReplyDelete.svg";

import Recomment from "./Recomment";
import displayedAt from "../../Utils/displayAt";
import { editReply } from "../../Hooks/useReply";
import { delReply } from "../../Hooks/useReply";
import useInput from "../../Hooks/useInput";
import { ReactComponent as Profile } from "../../Icons/myPageProfile.svg";

const CommentList = ({ reply, setShowInput, setRecommnetKey }) => {
  const [showReply, setShowReply] = useState(false);
  const [editable, setEditable] = useState(false);
  const [editValue, onChangeEditValue] = useInput("");

  const replyRef = useRef(null);

  useLayoutEffect(() => {
    if (replyRef.current !== null) replyRef.current.focus();
  });

  const queryClient = useQueryClient();

  const onShowInput = useCallback(() => {
    setRecommnetKey(reply.commentId);
    setShowInput("대댓글");
  }, []);

  const onShowRecomment = useCallback(() => {
    setShowReply(prev => !prev);
  }, []);

  //댓글 삭제 부분
  const delReplyData = useMutation(() => delReply(reply.commentId), {
    onSuccess: data => {
      console.log("삭제됨");
      queryClient.invalidateQueries("GET_REPLY");
    },
    onError: error => {
      console.log(error);
    }
  });

  const handleDelreply = () => {
    delReplyData.mutate();
  };

  //댓글 수정 부분
  const onShowEdit = useCallback(() => {
    setEditable(prev => !prev);
  }, []);

  const editReplyData = useMutation(reply => editReply(reply), {
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries("GET_REPLY");
    },
    onError: error => {
      console.log(error);
    }
  });

  const handleEditreply = () => {
    setEditable(false);
    editReplyData.mutate({ comment: editValue, commentId: reply.commentId });
  };

  //슬라이드 만들기

  const slideRef = useRef();
  const [firstTouchX, setFirstTouchX] = useState("");

  const onTouchStart = e => {
    setFirstTouchX(e.changedTouches[0].pageX);
  };

  const onTouchEnd = e => {
    let totalX = firstTouchX - e.changedTouches[0].pageX;
    // console.log(totalX);
    if (totalX > 80) {
      slideRef.current.style.transform = "translateX(-35%)";
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      return;
    }
    if (totalX < -10) {
      slideRef.current.style.transform = "translateX(0%)";
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      return;
    }
  };

  return (
    <>
      <Body onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} ref={slideRef}>
        <CommentWrap>
          <div>{reply.image ? <img src={reply.image} /> : <Profile />}</div>
          <CommentBody>
            <Nick>{reply.nickname}</Nick>
            {!editable ? (
              <div>{reply.comment}</div>
            ) : (
              <form onSubmit={handleEditreply}>
                <input value={editValue} onChange={onChangeEditValue} ref={replyRef} />
              </form>
            )}
            <CommentFooter>
              <Time>{displayedAt(reply.createdAt)}</Time>
              <Write onClick={onShowInput}>답글달기</Write>
              {!showReply && (
                <div onClick={onShowRecomment}>
                  {reply.recommentNum > 0 ? <>답글 {reply.recommentNum}개 더보기</> : null}
                </div>
              )}
              {showReply && <div onClick={onShowRecomment}>답글 닫기</div>}
            </CommentFooter>
          </CommentBody>
          <ButtonWrap>
            <button onClick={onShowEdit}>{!editable ? <ReplyUpdate /> : <CancleButton>&times;</CancleButton>}</button>
            <button onClick={handleDelreply}>
              <ReplyDelete />
            </button>
          </ButtonWrap>
        </CommentWrap>
      </Body>
      {showReply && <Recomment id={reply.commentId} />}
    </>
  );
};

export default CommentList;

const Body = styled.div`
  display: flex;
`;

const ButtonWrap = styled.div`
  margin-left: 1.2rem;
  display: flex;
  & button {
    border: none;
  }
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
const CommentWrap = styled.div`
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

const CommentFooter = styled.div`
  display: flex;
  color: #aaa;
  position: relative;
  top: 1.5rem;
`;

const Time = styled.div`
  padding-right: 1rem;
`;
const Write = styled.div`
  padding-right: 1rem;
`;

const CommentBody = styled.div`
  align-items: flex-start;
  gap: 0.2rem;
  height: 4.2rem;
  width: 29.7rem;
`;

const Nick = styled.div`
  line-height: 1rem;
  font-family: "Anton";
  font-size: 1.1rem;
  font-weight: 700;
`;
