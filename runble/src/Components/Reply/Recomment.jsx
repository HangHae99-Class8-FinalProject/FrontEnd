import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import {addReply } from "../../Hooks/useRecomment";
import RecommentItem  from "./recommentItem"
import {instance} from "../../Utils/Instance"


function Recomment({id }) {

  const onSuccess = () => {
    console.log("조회성공");
  };

  const onError = () => {
    console.log("조회실패");
  };
  // 댓글 조회

  const [recommentId,setRecommentId] = useState(1)
  

  const getRecomment = async (pageParam) => {
    setRecommentId(recommentId+1)
    console.log(recommentId)
    const response = await instance.get(`http://54.167.169.43/api/comment/${id}/${recommentId}/${pageParam}`);
    console.log(response.data)
    return response.data;
  }

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "GET_RECOMMENT",
    getRecomment,
    {
      onSuccess,
      onError
    }
  );

    console.log(data)


  const queryClient = useQueryClient();

  const [display, setDisplay] = useState(false);
  const [replyValue, setReplyValue] = useState("");



    //대댓글 추가
    const addReplyData = useMutation((reply)=>addReply(reply),{
      onSuccess: data => {
          console.log(data);
          queryClient.invalidateQueries("GET_RECOMMENT")
      },
      onError: error => {
          console.log(error);
        },
    })

  const handleAddreply = e => {
    e.preventDefault();
    addReplyData.mutate({
      commentId: id,
      recommentId:recommentId,
      comment: replyValue,
    });
    setReplyValue("");
  };


  return (
    <>
      <button
        onClick={() => {
          setDisplay(!display);
        }}
      >
      
        대댓글보기
      </button>
      <div>
                      <input
                          type="text"
                          value={replyValue}
                          onChange={e => setReplyValue(e.target.value)}
                        />
                        <button onClick={handleAddreply}>대댓글추가</button>
                    </div>


      {display && (
        <ReplyBox>
          {data?.Recomment.map(reply => {
            if (id === reply.commentId) {
              return (
                <Content key={reply.recommentId}>
                
                  <RecommentItem data={reply}/>
                </Content>
              );
            }
          })}
        </ReplyBox>
      )}
    </>
  );
}

export default Recomment;

const ReplyBox = styled.div`
  width: 100%;
  background-color: #eee;
  margin-bottom: 20px;
`;

const Content = styled.div`
  margin-left: 40px;
  margin-bottom: 10px;
`;


