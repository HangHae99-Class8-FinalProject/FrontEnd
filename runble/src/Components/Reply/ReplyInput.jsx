import React, { useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import useInput from "../../Hooks/useInput";
import { useMutation, useQueryClient } from "react-query";
import { addReply } from "../../Hooks/useReply";
import { addRecomment } from "../../Hooks/useRecomment";

const ReplyInput = ({ showInput, onCloseInput, postId }) => {
  const inputRef = useRef(null);
  const [replyValue, onChangeReplyValue, setReplyValue] = useInput("");

  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  });

  //댓글 작성
  const addReplyData = useMutation(reply => addReply(reply), {
    onSuccess: data => {
      queryClient.invalidateQueries("GET_REPLY");
    },
    onError: error => {
      console.log(error);
    }
  });

  //대댓글 작성
  const addRecommnetData = useMutation(reply => addRecomment(reply), {
    onSuccess: data => {
      queryClient.invalidateQueries("GET_RECOMMENT");
    },
    onError: error => {
      console.log(error);
    }
  });

  const handleAddreply = e => {
    e.preventDefault();
    if (showInput === "댓글") {
      addReplyData.mutate({ comment: replyValue, postId });
    }
    if (showInput === "대댓글") {
      addRecommnetData.mutate({
        commentId: postId,
        comment: replyValue
      });
    }
    setReplyValue("");
    onCloseInput();
  };

  const stopPropagation = e => {
    e.stopPropagation();
  };

  if (!showInput) {
    return null;
  }
  return (
    <form onSubmit={handleAddreply}>
      <InputWrap onClick={stopPropagation}>
        <div>
          <input ref={inputRef} value={replyValue} onChange={onChangeReplyValue} />
          <span onClick={onCloseInput}>&times;</span>
        </div>
      </InputWrap>
    </form>
  );
};

export default ReplyInput;

const InputWrap = styled.div`
  position: fixed;
  bottom: 7.4rem;
  background: #353434;

  width: 100%;
  height: 4rem;

  & div {
    display: flex;
    justify-content: space-between;
    padding: 0.7rem 1.6rem;
  }
  & input {
    width: 30rem;
    height: 2.8rem;
    border-radius: 0.8rem;
    background-color: #d9d9d9;
    border: none;
    &:focus {
      border: none;
    }
  }
  & span {
    color: white;
    padding-right: 2rem;
    font-size: 2.6rem;
    line-height: 2.9rem;
  }
`;
