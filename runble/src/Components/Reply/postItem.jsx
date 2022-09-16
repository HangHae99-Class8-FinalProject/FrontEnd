import React, { useState, useCallback } from "react";
import styled from "styled-components";
import displayedAt from "../../Utils/displayAt";
import ReplyInput from "./ReplyInput";
import { useParams } from "react-router-dom";
import {ReactComponent as MyPageProfile } from "../../Icons/MyPageProfile.svg"


function PostItem({ data }) {
  console.log(data.profile)
  const [showInput, setShowInput] = useState(false);
  const [showProfile, setShowProfile] = useState(data.profile);
  const { id: postId } = useParams();

  const onCloseInput = useCallback(() => {
    setShowInput(false);
  }, []);

  return (
    <>
      <PostBox>

        {showProfile === null ? <><MyPageProfile/></> :<div>
          <img src={data.profile} />
        </div>}
     
          <PostBody>
            <div>{data.nickname}</div>
            <div>{data.content}</div>
          </PostBody>
          <PostFooter>
            <Time>{displayedAt(data.createdAt)}</Time>
            <Like>좋아요{data.like}개</Like>
            <Write
          onClick={() => {
            setShowInput("댓글");
          }}
        >
          답글달기
        </Write>
          </PostFooter>
      </PostBox>
      <ReplyInput showInput={showInput} onCloseInput={onCloseInput} postId={postId} />
    </>
  );
}
export default PostItem;

const PostBox = styled.div`
font-size: 1rem;
display: flex;
align-items: center;
padding: 1.5rem 1.6rem;
gap: 0.8rem;
height: 8rem;
border-bottom: 0.1rem solid #e6e6e6;
& img {
    width: 4rem;
    height: 4rem;
    border-radius: 10rem;
  }
`;

const PostBody = styled.div`
  align-items: flex-start;
  gap: 0.2rem;
  height: 4.2rem;
  width: 29.7rem;`

const PostFooter = styled.div`
  display: flex;
  width:40rem;
  position:relative;
  right:13rem;
  top:3rem;
  color:#aaa;
`;

const Time = styled.div`
  padding-right:1rem;`
const Like = styled.div`
  padding-right:1rem;`
const Write = styled.button`
  outline:0;
  border:0;
  color:#aaa;
  background-color:transparent;
  font-size:1rem;
  margin-top:0.1rem`



