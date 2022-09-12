import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { editReply,delReply } from "../../Hooks/useReply";
import Lion from "./lion.png";
import Recomment from "./recomment";
import useInfinityScroll from "../../Hooks/useInfinityScroll";
import { instance } from "../../Utils/Instance";


function ReplyComponent() {

  const [ref, inView] = useInView();

  const queryClient = useQueryClient();

  

  const onSuccess = () => {
    console.log("조회성공");
  };

  const onError = () => {
    console.log("조회실패");
  };

  const getReply = async pageParam => {
    const {data} = await instance.get(`http://54.167.169.43/api/comment/1/${pageParam}`);
    return data;
  }

  // 댓글 조회
  const { data, status, fetchNextPage, isFetchingNextPage} = useInfinityScroll(
    "GET_REPLY",
    getReply,
    {
      onSuccess,
      onError
    }
  );

  console.log(data)

  useEffect(() => {
    if (inView) fetchNextPage;
  }, [inView]);


  //댓글삭제 
    const delReplyData = useMutation(commentId=>delReply(commentId),{
      onSuccess: data => {
          console.log(data);
          queryClient.invalidateQueries("GET_REPLY")
      },
      onError: error => {
          console.log(error);
        },
    })

  //댓글 삭제 버튼
  const handleDelreply = (id) => {
    console.log(id);
    delReplyData.mutate(id)
  };


  //댓글 수정
  const [editable, setEditable] = useState(false);
  const [clickedId, setClickedId] = useState("");
  const [replyValue, setReplyValue] = useState(data?.data.comment);
  const [nickValue, setNicValue] = useState(data?.data.nickname);
  const [profileValue, setProfileValue] = useState(data?.data.profile);
  const [recoCntValue, setRecoCntValue] = useState(data?.data.recommentCount);

  
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

  const handleEditreply = (
    commentId,
    nickname,
    profile,
    comment,
    recommentCount
  ) => {
    console.log(nickname);
    setEditable(true);
    setClickedId(commentId);
    setNicValue(nickname);
    setProfileValue(profile);
    setReplyValue(comment);
    setRecoCntValue(recommentCount);

    const initalState = {
      commentId: clickedId,
      nickname: nickValue,
      profile: profileValue,
      comment: replyValue,
      recommentCount: recoCntValue
    };
    editReplyData.mutate(initalState);
  };

  return (
    <ReplyBox>
      {data?.data.map(reply => {
        return (
          <div key={reply.commentId}>
            <Content>
              <Profile src={Lion}></Profile>
              <N_R>
                <NickName>{reply.nickname}</NickName>
                {editable && clickedId === reply.commentId ? (
                  <input
                    value={replyValue}
                    onChange={e => setReplyValue(e.target.value)}
                  />
                ) : (
                  <ReplyContent>{reply.comment}</ReplyContent>
                )}
              </N_R>
              <button
                onClick={() =>
                  handleEditreply(
                    reply.commentId,
                    reply.nickname,
                    reply.profile,
                    reply.comment,
                    reply.recommentCount
                  )
                }
              >
                {editable && clickedId === reply.commentId ? (
                  <span>제출하기</span>
                ) : (
                  <span>수정하기</span>
                )}
              </button>
              <button onClick={()=>handleDelreply(reply.id)}>
                삭제하기
              </button>
            </Content>
                  
            <Recomment replyCount={reply.recommentCount} id={reply.commentId} />
          </div>
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
  margin-bottom: 20px;
`;

const Content = styled.div``;
const Profile = styled.img`
  width: 50px;
  height: 50px;
  float: left;
`;

const N_R = styled.div``;
const NickName = styled.h4`
  margin: 0 10px;
`;
const ReplyContent = styled.p`
  display: inline-block;
  margin: 10px 0 0 10px;
`;
