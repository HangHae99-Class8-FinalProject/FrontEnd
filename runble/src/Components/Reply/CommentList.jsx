import React, { useCallback, useState, useRef, useLayoutEffect } from "react";
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
  const scrollRef = useRef();

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
  const [startMove, setStartMove] = useState("");
  const [endMove, setEndMove] = useState("");

  const onMouseDown = e => {
    e.stopPropagation();
    console.log("start");
    setStartMove(e.pageX);
  };
  const onMouseUP = e => {
    console.log("end");
    e.stopPropagation();
    setEndMove(e.pageX);
  };

  console.log("start", startMove);
  console.log("end", endMove);

  return (
    <>
      <Body ref={scrollRef} onMouseDown={onMouseDown} onMouseUp={onMouseUP}>
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
              {!showReply && <div onClick={onShowRecomment}>답글 {reply.recommentNum}개더보기</div>}
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
  overflow-y: hidden;
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
  /* transform: translateX(-25%); */
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
