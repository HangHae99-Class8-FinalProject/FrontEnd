import { instance } from "../../Utils/Instance";
import { useQuery } from "react-query";
import { useState } from "react";
import Lion from "./lion.png";
import styled from "styled-components";

function Recomment({ replyCount, id }) {
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

  console.log(data?.data[0].commentId);
  const [display, setDisplay] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setDisplay(!display);
        }}
      >
        답글{replyCount}개 보기
      </button>
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
