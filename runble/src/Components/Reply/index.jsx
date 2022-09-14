import React,{ useState }  from "react";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query";

import ReplyComponent from "./replyComponent";
import { addReply } from "../../Hooks/useReply";
import { useParams } from "react-router-dom";

const ReplyCom = () => {

    
  const { id: postId } = useParams();
  
  console.log(postId)

  const [replyValue, setReplyValue] = useState("");

  //댓글추가
  const queryClient = useQueryClient();

const addReplyData = useMutation((reply)=>addReply(reply),{
  onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries("GET_REPLY")
  },
  onError: error => {
      console.log(error);
    },
})

  const handleAddreply = e => {
    e.preventDefault();
    addReplyData.mutate({ comment: replyValue,postId:postId}) //api 데이터용
    setReplyValue("");
  };

  return (
    <>
      <Wrap>
      <input
          type="text"
          value={replyValue}
          onChange={e => setReplyValue(e.target.value)}
        />
        <button onClick={handleAddreply}>댓글추가</button>

        <ReplyArea>
          <ReplyComponent />
        </ReplyArea>

      </Wrap>
      
    </>
  );
};

export default ReplyCom;

const Wrap = styled.div`
  margin: 0px;
  border: 1px solid black;
  height: 1000px;
`;


const ReplyArea = styled.div`
  margin: 20px;
`;
