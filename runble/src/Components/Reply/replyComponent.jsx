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
    const res = await instance.get(`http://54.167.169.43/api/comment/${postId}/${pageParam}`);
    const {Comment, isLast} = res.data;
    console.log("확인",pageParam)
    return { Comment, nextPage: pageParam + 1, isLast };
  };

  const [ref, inView] = useInView();

  const [data, status, fetchNextPage, isFetchingNextPage, lastPage] = useInfinityScroll("GET_REPLY", getReply);

  

  useEffect(() => {
    if (inView ) fetchNextPage();
  }, [inView]);

  //댓글 수정
  const [editable, setEditable] = useState(false);
  const [replyValue, setReplyValue] = useState("");

  const [recommentKey, setRecommentKey] = useState("");
  console.log(recommentKey, "key");


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
      {isFetchingNextPage ? <></> : <div ref={ref}></div>}
      <Nav />
    </>
  );
}

export default ReplyComponent;

const ReplyBox = styled.div`
  height:100rem ;
`;
