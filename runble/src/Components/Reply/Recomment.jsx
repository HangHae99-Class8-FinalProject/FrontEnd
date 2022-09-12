import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { getRecomment,addReply } from "../../Hooks/useRecomment";
import RecommentItem  from "./recommentItem"


function Recomment({ replyCount, id }) {
  const queryClient = useQueryClient();

  const [display, setDisplay] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  const [recommentIdCnt, setRecommentIdCnt] = useState(1);

  console.log(id);
  const onSuccess = () => {
    console.log("perform side effect after data fetching");
  };

  const onError = () => {
    console.log("perform side effect after encountering error");
  };

  // const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
  //   "GET_RECOMMENT",
  //   getRecomment,
  //   {
  //     onSuccess,
  //     onError
  //   }
  // );

    const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "GET_RECOMMENT",
    getRecomment,
    {
      onSuccess,
      onError
    }
  );


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
    setRecommentIdCnt(recommentIdCnt + 1);
    const initalState = {
      commentId: id,
      recommentId: recommentIdCnt,
      nickname: "기린",
      profile: "",
      comment: replyValue,
    };
    addReplyData.mutate(initalState);
    setReplyValue("");
  };


  return (
    <>
      <button
        onClick={() => {
          setDisplay(!display);
        }}
      >
        답글{replyCount}개 보기

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
          {data?.data.map(reply => {
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


