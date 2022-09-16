import React, { useCallback, useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";

import { ReactComponent as ReplyUpdate } from "../../Icons/ReplyUpdate.svg";
import { ReactComponent as ReplyDelete } from "../../Icons/ReplyDelete.svg";

import Recomment from "./Recomment";
import displayedAt from "../../Utils/displayAt";
import { editReply } from "../../Hooks/useReply";
import { delReply } from "../../Hooks/useReply";
import useInput from "../../Hooks/useInput";

const CommentList = ({ reply, setShowInput, setRecommnetKey }) => {
  const [showReply, setShowReply] = useState(false);
  const [editable, setEditable] = useState(false);
  const [editValue, onChangeEditValue] = useInput("");

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

  return (
    <>
      <CommentWrap>
        <div>
          <img src={reply.image} />
        </div>
        <CommentBody>
          <div>{reply.nickname}</div>
          {!editable ? (
            <div>{reply.comment}</div>
          ) : (
            <form onSubmit={handleEditreply}>
              <input value={editValue} onChange={onChangeEditValue} />
            </form>
          )}
          <CommentFooter>
            <Time>{displayedAt(reply.createdAt)}</Time>
            <Write onClick={onShowInput}>답글달기</Write>
            <div onClick={onShowRecomment}>댓글 {reply.recommentNum}개더보기</div>
          </CommentFooter>
        </CommentBody>
      </CommentWrap>
      {showReply && <Recomment id={reply.commentId} />}

      <button onClick={onShowEdit}>{!editable ? <ReplyUpdate /> : <>&times;</>}</button>
      <button onClick={handleDelreply}>
        <ReplyDelete />
      </button>
    </>
  );
};

export default CommentList;

const CommentWrap = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  padding: 1.5rem 1.6rem;
  gap: 0.8rem;
  height: 7rem;
  border-bottom: 0.1rem solid #e6e6e6;

  & img {
    width: 4rem;
    height: 4rem;
    border-radius: 10rem;
  }
`;

const CommentFooter = styled.div`
  display: flex;
  color:#aaa;
  position:relative;
  top:1.5rem ;

`;

const Time = styled.div`
  padding-right:1rem;`
const Write = styled.div`
  padding-right:1rem;`
  

const CommentBody = styled.div`
  align-items: flex-start;
  gap: 0.2rem;
  height: 4.2rem;
  width: 29.7rem;
`;