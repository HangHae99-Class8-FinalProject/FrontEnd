import styled from "styled-components";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { delReply,editReply } from "../../Hooks/useRecomment";
import Lion from "./lion.png";

function RecommentItem ({data}){
    console.log(data.recommentId)
    const queryClient = useQueryClient();


      //대댓글 삭제
   const delReplyData = useMutation(recommentId=>delReply(recommentId),{
    onSuccess: data => {
        console.log(data);
        queryClient.invalidateQueries("GET_RECOMMENT")
    },
    onError: error => {
        console.log(error);
      },
  })
    //대댓글 삭제 버튼
const handleDelreply = (id) => {
    console.log(id);
    delReplyData.mutate(id)
  };


//대댓글 수정

const [editable, setEditable] = useState(false);
const [clickedId, setClickedId] = useState("");
const [nickValue, setNicValue] = useState(data.nickname);
const [profileValue, setProfileValue] = useState(data.profile);
const [recoCntValue, setRecoCntValue] = useState("");
const [commentValue, setCommentValue] = useState(data.comment)



const editReplyData = useMutation(reply => editReply(reply), {
  onSuccess: data => {
    console.log(data);
    setEditable(!editable);
    queryClient.invalidateQueries("GET_RECOMMENT");
  },
  onError: error => {
    console.log(error);
  }
});

const handleEditreply = (
  commentId,
  recommentId,
  nickname,
  profile,
  comment,
) => {
  console.log(nickname);
  setEditable(true);
  setClickedId(commentId);
  setNicValue(nickname);
  setProfileValue(profile);
  setCommentValue(comment);
  setRecoCntValue(recommentId);

  const initalState = {
    commentId: clickedId,
    recommentId:recoCntValue,
    nickname: nickValue,
    profile: profileValue,
    comment: commentValue,
  };
  editReplyData.mutate(initalState);
};

    return(
        
            <>
                  <Profile src={Lion}></Profile>
                  <N_R>
                    <NickName>{data.nickname}</NickName>

                    {editable && clickedId === data.commentId ? (
                  <input 
                    value={commentValue}
                    onChange={event => setCommentValue(event.target.value)}
                  />
                ) : (
                  <ReplyContent>{data.comment}</ReplyContent>
                )}
                   
                  </N_R>
                  <button
                onClick={() =>
                  handleEditreply(
                    data.commentId,
                    data.recommentId,
                    data.nickname,
                    data.profile,
                    data.comment,
                    
                  )
                }
              >
                {editable && clickedId === data.commentId ? (
                  <span>제출하기</span>
                ) : (
                  <span>수정하기</span>
                )}
              </button>

              <button onClick={()=>handleDelreply(data)}>
                삭제하기
              </button>
            </>
            
    )
}

export default RecommentItem;



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

