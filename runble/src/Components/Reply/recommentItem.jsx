import styled from "styled-components";
import { useState } from "react";
import { useMutation,useQueryClient } from "react-query";

import { delReply,editReply } from "../../Hooks/useRecomment";

function RecommentItem ({data}){
  console.log(data)
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
const [clickedId, setClickedId] = useState(data.commentId);
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

const handleEditreply = (commentId) => {
  setClickedId(commentId);
  editReplyData.mutate({
    commentId: clickedId,
    recommentId:data.recommentId,
    comment: commentValue,
  });
};

    return(
            <>
                  <Profile src={data.image}></Profile>
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
                    data.comment
                  )
                }
              >
                {editable && clickedId === data.commentId ? (
                  <span>제출하기</span>
                ) : (
                  <span>수정하기</span>
                 
                )}
              </button>
              {/* <DeleteIcon/> */}
              <button onClick={()=>handleDelreply(data)}>
          
              </button>
            
         </>      
    )
}

export default RecommentItem;

const Profile = styled.img`
  width: 5rem;
  height: 5rem;
  float: left;
`;

const N_R = styled.div`  margin-left:10p ;`;
const NickName = styled.div`

`;
const ReplyContent = styled.p`
  display: inline-block;
  word-break:break-all;
`;

