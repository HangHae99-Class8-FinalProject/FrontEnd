import React, { useState } from "react";
import styled from "styled-components";
import Lion from "./lion.png";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Recomment from "./Recomment";
import { instance } from "../../Utils/Instance";
import { editReply,getReply,delReply } from "../../Hooks/useReply";



function ReplyComponent() {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    console.log("perform side effect after data fetching");
  };

  const onError = () => {
    console.log("perform side effect after encountering error");
  };

  // 댓글 조회
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "GET_REPLY",
    getReply,
    {
      onSuccess,
      onError
    }
  );

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
