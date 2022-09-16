import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import displayedAt from "../../Utils/displayAt";
import { addReply } from "../../Hooks/useReply";

function PostItem ({data}) {
      console.log(data)

      const { id: postId } = useParams();
      const [replyValue, setReplyValue] = useState("");
      const [inputValue, setInputValue] = useState(false);


      const queryClient = useQueryClient();
      const addReplyData = useMutation(reply => addReply(reply), {
        onSuccess: data => {
          console.log(data);
          queryClient.invalidateQueries("GET_REPLY");
        },
        onError: error => {
          console.log(error);
        }
      });
    
      const handleAddreply = e => {
        e.preventDefault();
        addReplyData.mutate({ comment: replyValue, postId: postId }); //api 데이터용
        setReplyValue("");
      };
    return(
        <>
        <PostBox>
            <Profile >
              <img src={data.profile}/>
            </Profile>
            <Nic>{data.nickname}</Nic>    
            <Content>{data.content}</Content>
            <Time>{displayedAt(data.createdAt)}</Time>
            <Like>좋아요{data.like}개</Like>
            <Write onClick={()=>{setInputValue(!inputValue)}} >답글달기</Write>
        </PostBox>
        {inputValue &&(
                   <InputBox>
                   <Input type="text" value={replyValue} onChange={e => setReplyValue(e.target.value)} />
                   <Button onClick={handleAddreply}>댓글추가</Button>
                  </InputBox>
            )}
        </>
    )
}
export default PostItem

const PostBox = styled.div`
 border-bottom:1px solid #111 ;
 height:10% ;
`
const Profile = styled.div`
  width: 50px;
  height: 50px;
  float: left;
`;

const Nic = styled.div`
 position:absolute;
 left:110px;
 top:55px;
 font-size:1rem`

 const Content = styled.div`
  position:absolute;
  left:110px;
  top:80px;
  width:70%;
  word-break:break-all;`

  const Time = styled.div`
    color: #999999;
    font-size: 15px;
    line-height: 14px;
    position:absolute;
    left:110px;
    top:120px;`

  const Like = styled.div`
    color: #999999;
    font-size: 15px;
    line-height: 14px;
    position:absolute;
    left:180px;
    top:120px;`

const Write = styled.button`
  color: #999999;
  font-size: 15px;
  line-height: 14px;
  position:absolute;
  left:260px;
  top:118px;
  background-color:white;
  border:0;
  outline:0;`

const InputBox = styled.div`
  background-color: #eee ;
  height:5.5rem ;
  `
const Input = styled.input`
  width:20rem;
  height:3rem;
  border-radius:1rem;
  margin: 1rem 4rem`

const Button = styled.button`
  outline:0;
  border:0;
  font-size:2rem`

