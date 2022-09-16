import styled from "styled-components";
import React, { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { ReactComponent as ReplyUpdate } from "../../Icons/ReplyUpdate.svg";
import { ReactComponent as ReplyDelete } from "../../Icons/ReplyDelete.svg";

import displayedAt from "../../Utils/displayAt";
import { delRecomment, editRecomment } from "../../Hooks/useRecomment";
import useInput from "../../Hooks/useInput";
import { ReactComponent as Profile } from "../../Icons/myPageProfile.svg";

function RecommentItem({ data }) {
  console.log(data);
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

  //대댓글 수정

  const [editable, setEditable] = useState(false);
  const [commentValue, setCommentValue] = useState(data.comment);
  const [editValue, onChangeEditValue, setEditValue] = useInput("");

  const onShowEdit = useCallback(() => {
    setEditable(prev => !prev);
  }, []);

  const editRecommentData = useMutation(reply => editRecomment(reply), {
    onSuccess: data => {
      console.log(data);
      setEditable(!editable);
      queryClient.invalidateQueries("GET_RECOMMENT");
    },
    onError: error => {
      console.log(error);
    }
  });

  const handleEditreply = () => {
    setEditable(false);
    editRecommentData.mutate({
      commentId: data.commentId,
      recommentId: data.recommentId,
      comment: commentValue
    });
  };

  const userData = JSON.parse(window.localStorage.getItem("userData"));

  return (
    <Body>
      <RecommentBox>
        <div>{data.image ? <img src={data.image} /> : <Profile />}</div>
        <RecommentBody>
          <Nick>{data.nickname}</Nick>
          {!editable ? (
            <div>{data.comment}</div>
          ) : (
            <form onSubmit={handleEditreply}>
              <input value={editValue} onChange={onChangeEditValue} />
            </form>
          )}
          <RecommentFooter>
            <div>{displayedAt(data.createdAt)}</div>
          </RecommentFooter>
        </RecommentBody>
        {data.nickname === userData.nickname ? (
          <ButtonWrap>
            <button onClick={onShowEdit}>{!editable ? <ReplyUpdate /> : <>&times;</>}</button>
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
  overflow-y: hidden;
  margin-left: 3rem;
`;

const Nick = styled.div`
  line-height: 1rem;
  font-family: "Anton";
  font-size: 1.1rem;
  font-weight: 700;
`;
const ButtonWrap = styled.div`
  display: flex;
  margin-left: 1.2rem;
  & button {
    border: none;
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
