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

  console.log(showInput);
  console.log(postId);
  useLayoutEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  });

  const addReplyData = useMutation(reply => addReply(reply), {
    onSuccess: data => {
      console.log("성공함", data);
      queryClient.invalidateQueries("GET_REPLY");
    },
    onError: error => {
      console.log(error);
    }
  });

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
    } else {
      //대댓글
      addRecommnetData.mutate({
        commentId: postId,
        comment: replyValue
      });
    }
    setReplyValue("");
    onCloseInput();
  };

  if (!showInput) {
    return null;
  }
  return (
    <form onSubmit={handleAddreply}>
      <InputWrap>
        <div>
          <input ref={inputRef} value={replyValue} onChange={onChangeReplyValue} />
          <div onClick={onCloseInput}>&times;</div>
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
  z-index: 10;
  width: 100%;
  height: 4rem;
  & div {
    display: flex;
    justify-content: space-between;
    padding: 0.7rem 1.6rem;
  }
  & input {
    width: 28.2rem;
    height: 2.8rem;
    border-radius: 0.8rem;
    background-color: #d9d9d9;
    border: none;
    &:focus {
      border: none;
    }
  }
`;
