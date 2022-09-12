import { instance } from "../../Utils/Instance";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Lion from "./lion.png";
import styled from "styled-components";
import { addReply } from "../../Hooks/useRecomment";


function Recomment({ replyCount, id }) {
  const queryClient = useQueryClient();

  const [display, setDisplay] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  const [commentIdCnt, setCommentIdCnt] = useState(1);
  const [recommentIdCnt, setRecommentIdCnt] = useState(1);

  console.log(id);
  const onSuccess = () => {
    console.log("perform side effect after data fetching");
  };

  const onError = () => {
    console.log("perform side effect after encountering error");
  };

  const getrecommentReply = async () => {
    return await instance.get("http://localhost:8001/Recomment");
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "GET_RECOMMENT",
    getrecommentReply,
    {
      onSuccess,
      onError
    }
  );

  console.log(data?.data[0].recommentId);
  

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
    setCommentIdCnt(commentIdCnt + 1);
    setRecommentIdCnt(recommentIdCnt + 1);
    const initalState = {
      commentId: commentIdCnt,
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
                  <Profile src={Lion}></Profile>
                  <N_R>
                    <NickName>{reply.nickname}</NickName>
                    <ReplyContent>{reply.comment}</ReplyContent>
                  </N_R>
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
