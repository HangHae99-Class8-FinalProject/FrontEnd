import React, { useState, useCallback } from "react";
import styled from "styled-components";
import displayedAt from "../../Utils/displayAt";
import ReplyInput from "./ReplyInput";
import { useParams } from "react-router-dom";

function PostItem({ data }) {
  const [showInput, setShowInput] = useState(false);
  const { id: postId } = useParams();

  const onCloseInput = useCallback(() => {
    setShowInput(false);
  }, []);

  return (
    <>
      <PostBox>
        <Profile src={data.profile} />
        <Nic>{data.nickname}</Nic>
        <Content>{data.content}</Content>
        <Time>{displayedAt(data.createdAt)}</Time>
        <Like>좋아요{data.like}개</Like>
        <Write
          onClick={() => {
            setShowInput("댓글");
          }}
        >
          답글달기
        </Write>
      </PostBox>
      <ReplyInput showInput={showInput} onCloseInput={onCloseInput} postId={postId} />
    </>
  );
}
export default PostItem;

const PostBox = styled.div`
  border-bottom: 1px solid #111;
  height: 10%;
`;
const Profile = styled.img`
  width: 50px;
  height: 50px;
  float: left;
  margin-top: 10px;
`;

const Nic = styled.div`
  position: absolute;
  left: 110px;
  top: 55px;
`;

const Content = styled.div`
  position: absolute;
  left: 110px;
  top: 80px;
  width: 70%;
  word-break: break-all;
`;

const Time = styled.div`
  color: #999999;
  font-size: 15px;
  line-height: 14px;
  position: absolute;
  left: 110px;
  top: 120px;
`;

const Like = styled.div`
  color: #999999;
  font-size: 15px;
  line-height: 14px;
  position: absolute;
  left: 180px;
  top: 120px;
`;

const Write = styled.button`
  color: #999999;
  font-size: 15px;
  line-height: 14px;
  position: absolute;
  left: 260px;
  top: 118px;
  background-color: white;
  border: 0;
  outline: 0;
`;
