import React,{ useState }  from "react";
import styled from "styled-components";
import ReplyComponent from "./replyComponent";
import { addReply } from "../../Hooks/useReply";
import { useMutation, useQuery, useQueryClient } from "react-query";

const ReplyCom = () => {
  const [replyValue, setReplyValue] = useState("");
  const [commentIdCnt, setCommentIdCnt] = useState(1);

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
    setCommentIdCnt(commentIdCnt + 1);
    const initalState = {
      commentId: commentIdCnt,
      nickname: "기린",
      profile: "",
      comment: replyValue,
      recommentCount: 0
    };
    addReplyData.mutate(initalState);
    setReplyValue("");
  };

  return (
    <>
      <Wrap>
        <Detail />
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
  margin: 20px;
  border: 1px solid black;
  height: 1000px;
`;

const Detail = styled.div`
  border: 1px solid black;
  margin-top: 400px;
`;

const ReplyArea = styled.div`
  margin: 20px;
`;
