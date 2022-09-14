import React, { useState } from "react";
import styled from "styled-components";
import Lion from "./lion.png";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Recomment from "./Recomment";

import { instance } from "../../Utils/Instance";
import { editReply } from "../../Hooks/useReply";

const getReply = async () => {
  return await instance.get("http://localhost:8000/Comment");
};

function ReplyComponent() {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    console.log("perform side effect after data fetching");
  };

  const onError = () => {
    console.log("perform side effect after encountering error");
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery("GET_REPLY", getReply, {
    onSuccess,
    onError
  });

  //   const delReplyData = useMutation((commentId)=>delReply(commentId),{
  //     onSuccess: (commentId) => {
  //         console.log(commentId);
  //         queryClient.invalidateQueries("GET_REPLY")
  //     },
  //     onError: (error) => {
  //         console.log(error);
  //       },
  //   })

  //댓글 삭제 버튼
  const handleDelreply = commentId => {
    console.log(commentId);
  };

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

  const handleEditreply = (commentId, nickname, profile, comment, recommentCount) => {
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
        console.log(reply);
        return (
          <div key={reply.commentId}>
            <Content>
              <Profile src={Lion}></Profile>
              <N_R>
                <NickName>{reply.nickname}</NickName>
                {editable && clickedId === reply.commentId ? (
                  <input value={replyValue} onChange={e => setReplyValue(e.target.value)} />
                ) : (
                  <ReplyContent>{reply.comment}</ReplyContent>
                )}
              </N_R>
              <button
                onClick={() =>
                  handleEditreply(reply.commentId, reply.nickname, reply.profile, reply.comment, reply.recommentCount)
                }
              >
                {editable && clickedId === reply.commentId ? <span>제출하기</span> : <span>수정하기</span>}
              </button>
              <button onClick={handleDelreply(reply.commentId)}>삭제하기</button>
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
  margin-bottom: 2rem;
`;

const Content = styled.div``;
const Profile = styled.img`
  width: 5rem;
  height: 5rem;
  float: left;
`;

const N_R = styled.div``;
const NickName = styled.h4`
  margin: 0 1rem;
`;
const ReplyContent = styled.p`
  display: inline-block;
  margin: 1rem 0 0 1rem;
`;
