import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

import { editReply, delReply } from "../../Hooks/useReply";
import useInfinityScroll from "../../Hooks/useInfinityScroll";
import { instance } from "../../Utils/Instance";
import ReplyInput from "./ReplyInput";
import CommentList from "./CommentList";
import Nav from "../Common/Nav/index";

function ReplyComponent() {
  const [showInput, setShowInput] = useState(false);

  const queryClient = useQueryClient();
  const { id: postId } = useParams();

  //댓글조회
  const getReply = async pageParam => {
    const { data } = await instance.get(`http://54.167.169.43/api/comment/${postId}/${pageParam}`);
    return data;
  };

  const [ref, inView] = useInView();

  const [data, fetchNextPage, lastPage] = useInfinityScroll("GET_REPLY", getReply);

  useEffect(() => {
    if (inView && lastPage) fetchNextPage();
  }, [inView, lastPage]);

  //댓글 수정
  const [editable, setEditable] = useState(false);
  const [replyValue, setReplyValue] = useState("");

  const [recommentKey, setRecommentKey] = useState("");
  console.log(recommentKey, "key");

  const editReplyData = useMutation(reply => editReply(reply), {
    onSuccess: data => {
      console.log(data);
      setEditable(!editable);
      queryClient.invalidateQueries("GET_REPLY");
    },
    onError: error => {
      console.log(error);
    }
  });

  const handleEditreply = (commentId, comment) => {
    setEditable(true);
    setReplyValue(comment);
    console.log(replyValue);
    editReplyData.mutate({ comment: replyValue, commentId: commentId });
  };

  const onCloseInput = useCallback(() => {
    setShowInput(false);
  }, []);

  return (
    <>
      <ReplyBox>
        {data?.pages.map((page, i) => {
          return (
            <React.Fragment key={i}>
              {page?.Comment?.map((reply, idx) => {
                console.log(page, reply);
                return (
                  <div key={idx}>
                    <CommentList reply={reply} setShowInput={setShowInput} setRecommnetKey={setRecommentKey} />
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
        <ReplyInput onCloseInput={onCloseInput} showInput={showInput} postId={recommentKey} />
      </ReplyBox>
      <Nav />
    </>
  );
}

export default ReplyComponent;

const ReplyBox = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  border-bottom: 1px solid #ccc;
  height: auto;
`;
const Profile = styled.img`
  width: 5rem;
  height: 5rem;
  float: left;
  margin-left: 50px;
  margin-bottom: 10px;
`;

const N_R = styled.div`
  width: 75%;
  margin-left: auto;
  word-break: break-all;
`;

const NickName = styled.p`
  margin: 10px;
`;
const ReplyContent = styled.div`
  margin: 10px 0 0 10px;
  width: 90%;
`;

const ReplyText = styled.p``;

const Time = styled.div`
  display: inline-block;
  color: #999999;
  font-size: 15px;
  line-height: 14px;
  position: relative;
  left: 2rem;
`;

const Write = styled.button`
  color: #999999;
  font-size: 15px;
  line-height: 14px;
  background-color: transparent;
  border: 0;
  outline: 0;
  position: relative;
  left: 4rem;
`;

const RecommentBtn = styled.button`
  color: #999999;
  font-size: 15px;
  line-height: 14px;
  background-color: white;
  border: 0;
  outline: 0;
  position: relative;
  left: 4.5rem;
`;

const Button = styled.button`
  outline: 0;
  border: 0;
`;
const Input = styled.input`
  width: 20rem;
  height: 3rem;
  border-radius: 1rem;
  margin: 0rem 1rem;
`;
