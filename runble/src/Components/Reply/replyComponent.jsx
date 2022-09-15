import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useMutation, useQueryClient } from "react-query";

import { editReply, delReply } from "../../Hooks/useReply";
import Recomment from "./Recomment";
import useInfinityScroll from "../../Hooks/useInfinityScroll";
import { instance } from "../../Utils/Instance";
import { useParams } from "react-router-dom";
import displayedAt from "../../Utils/displayAt";

function ReplyComponent() {
  const [display, setDisplay] = useState(false);

  const [ref, inView] = useInView();

  const queryClient = useQueryClient();

  const { id: postId } = useParams();

  const onSuccess = () => {
    console.log("조회성공");
  };

  const onError = () => {
    console.log("조회실패");
  };

  //댓글조회
  const getReply = async pageParam => {
    const response = await instance.get(`http://54.167.169.43/api/comment/${postId}/${pageParam}`);
    const { Comment, isLast } = response.data;
    console.log(pageParam);
    return { Comment, nextPage: pageParam + 1, isLast };
  };

  const [data, fetchNextPage, isFetchingNextPage] = useInfinityScroll("GET_REPLY", getReply, {
    onSuccess,
    onError
  });

  console.log(data?.pages[0].Comment[0].commentId);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  //댓글삭제
  const delReplyData = useMutation(commentId => delReply(commentId), {
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries("GET_REPLY");
    },
    onError: error => {
      console.log(error);
    }
  });

  //댓글 삭제 버튼
  const handleDelreply = id => {
    console.log(id);
    delReplyData.mutate(id);
  };

  //댓글 수정
  const [editable, setEditable] = useState(false);
  const [clickedId, setClickedId] = useState(data?.commentId);
  const [replyValue, setReplyValue] = useState("");

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
    setClickedId(commentId);
    setReplyValue(comment);
    console.log(replyValue);
    editReplyData.mutate({ comment: replyValue, commentId: clickedId });
  };

  return (
    <ReplyBox>
      {data?.pages.map((page, i) => {
        return (
          <React.Fragment key={i}>
            {page?.Comment?.map((reply, i) => {
              return (
                <div key={i}>
                  <Content>
                    <Profile src={reply.image}></Profile>
                    <N_R>
                      <NickName>{reply.nickname}</NickName>
                      {editable && clickedId === reply.commentId ? (
                        <input value={replyValue} onChange={e => setReplyValue(e.target.value)} />
                      ) : (
                        <ReplyContent>
                          <ReplyText>{reply.comment}</ReplyText>
                        </ReplyContent>
                      )}
                    </N_R>
                    <button onClick={() => handleEditreply(reply.commentId, reply.comment)}>
                      {editable && clickedId === reply.commentId ? <span>제출하기</span> : <span>수정하기</span>}
                    </button>
                    <button onClick={() => handleDelreply(reply.commentId)}>삭제하기</button>
                    <Time>{displayedAt(reply.createdAt)}</Time>
                    <Write>답글달기</Write>

                    <RecommentBtn
                      onClick={() => {
                        setDisplay(!display);
                      }}
                    >
                      답글0개더보기
                    </RecommentBtn>

                    {display && <Recomment id={reply.commentId} />}
                  </Content>
                </div>
              );
            })}
          </React.Fragment>
        );
      })}
      {isFetchingNextPage ? <span>로딩중입니다</span> : <div ref={ref}></div>}
    </ReplyBox>
  );
}

export default ReplyComponent;

const ReplyBox = styled.div`
  width: 100%;
  background-color: #eee;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  border-bottom: 1px solid #111;
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
  width: 80%;
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
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 14px;
  position: relative;
  left: 110px;
`;

const Write = styled.button`
  color: #999999;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 14px;
  background-color: transparent;
  border: 0;
  outline: 0;
  position: relative;
  left: 130px;
`;

const RecommentBtn = styled.button`
  color: #999999;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 14px;
  background-color: white;
  border: 0;
  outline: 0;
  position: relative;
  left: 150px;
`;
