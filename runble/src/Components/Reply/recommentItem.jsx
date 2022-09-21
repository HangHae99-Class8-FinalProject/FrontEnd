import styled from "styled-components";
import React, { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { ReactComponent as ReplyUpdate } from "../../Icons/ReplyUpdate.svg";
import { ReactComponent as ReplyDelete } from "../../Icons/ReplyDelete.svg";

import displayedAt from "../../Utils/displayAt";
import { delRecomment, editRecomment } from "../../Hooks/useRecomment";
import useInput from "../../Hooks/useInput";

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
      commentId : data.commentId,
      recommentId: data.recommentId,
      comment: commentValue
    });
  };

  return (
    <>
      <RecommentBox>
        <div>
          <img src={data.image} />
        </div>
        <RecommentBody>
          <div>{data.nickname}</div>
          {!editable ? (
            <div>{data.comment}</div>
          ):( 
          <form onSubmit={handleEditreply}>
            <input value={editValue} onChange={onChangeEditValue} />
          </form>
          )}
        </RecommentBody>
        <RecommentFooter>
        <Time>{displayedAt(data.createdAt)}</Time>
        </RecommentFooter>
        <div>
          <button onClick={onShowEdit}>{!editable ? <ReplyUpdate /> : <>&times;</>}</button>
          <button onClick={handleDelreply}>
            <ReplyDelete />
          </button>
        </div>
      </RecommentBox>

    </>
  );
}

export default RecommentItem;

const RecommentBox = styled.div`
   margin-left:3rem; 
  font-size: 1rem;
  display: flex;
  align-items: center;
  padding: 1.5rem 1.6rem;
  gap: 0.8rem;  
  height: 7rem;;
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
  width: 29.7rem;`

const RecommentFooter = styled.div`
  display: flex;
  width:40rem;
  position:relative;
  right:12rem;
  top:3rem;
  color:#aaa;
`;

const Time = styled.div`
 `