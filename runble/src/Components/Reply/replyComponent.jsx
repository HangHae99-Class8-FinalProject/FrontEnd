import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useMutation, useQueryClient,useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";

import { editReply,delReply } from "../../Hooks/useReply";
import useInfinityScroll from "../../Hooks/useInfinityScroll";
import Recomment from "./recomment"
import { instance } from "../../Utils/Instance";
import displayedAt from "../../Utils/displayAt";
import { ReactComponent as ReplyUpdate} from "../../Icons/ReplyUpdate.svg"
import { ReactComponent as ReplyDelete} from "../../Icons/ReplyDelete.svg"



function ReplyComponent() {
  const [display, setDisplay] = useState(false);



  const queryClient = useQueryClient();

  const { id: postId } = useParams();


  //댓글조회
  const getReply = async pageParam => {
    const response = await instance.get(`http://54.167.169.43/api/comment/${postId}/${pageParam}/:12`);
    const { Comment, isLast } = response.data;
    console.log(pageParam);
    return { Comment, nextPage: pageParam + 1, isLast };
  };

  const [ref, inView] = useInView();

    // const {data ,status, fetchNextPage, isFetchingNextPage, lastPage } = useInfiniteQuery("GET_REPLY",
    // ({pageParam = 1}) => getReply(pageParam),
    //   {
    //   getNextPageParam: (lastPage) =>
    //    !lastPage.isLast ? lastPage.nextPage:undefined,
    //   }
    // );

    const [data, fetchNextPage, isFetchingNextPage,lastPage] = useInfinityScroll(
      "GET_REPLY",
      getReply,
    );
 

  console.log(data);

  useEffect(() => {
    if (inView && lastPage) fetchNextPage();
  }, [inView,lastPage]);



  //댓글삭제
  const delReplyData = useMutation(commentId => delReply(commentId), {
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries("GET_REPLY");
    },
    onError: error => {
      console.log(error);
    }
  });

  //댓글 삭제 버튼
  const handleDelreply = id => {
    console.log(id);
    delReplyData.mutate(id);
  };

  //댓글 수정
  const [editable, setEditable] = useState(false);
  const [clickedId, setClickedId] = useState(data?.commentId);
  const [replyValue, setReplyValue] = useState("");

  const editReplyData = useMutation(reply => editReply(reply), {
    onSuccess: data => {
      console.log(data);
      setEditable(!editable);
      queryClient.invalidateQueries("GET_REPLY");
    },
    onError: error => {
      console.log(error);
    }
  });

  const handleEditreply = (commentId, comment) => {
    setEditable(true);
    setReplyValue(comment);
    console.log(replyValue);
    editReplyData.mutate({ comment: replyValue, commentId: commentId });
  };

  return (
    <ReplyBox>
      {data?.pages.map((page, i) => {
        return (
          <React.Fragment key={i}>
            {page?.Comment?.map((reply, i) => {
              return (
                <div key={i}>
                  <Content>
                    <Profile src={reply.image}></Profile>
                    <N_R>
                      <NickName>{reply.nickname}</NickName>
                      {editable && clickedId === reply.commentId ? (
                        <Input value={replyValue} onChange={e => setReplyValue(e.target.value)} />
                      ) : (
                        <ReplyContent>
                          <ReplyText>{reply.comment}</ReplyText>
                        </ReplyContent>
                      )}
                    </N_R>
                     <Button onClick={() => handleEditreply(reply.commentId, reply.comment)}>
                      {editable && clickedId === reply.commentId ? <ReplyUpdate /> :    <ReplyUpdate/>}
                    </Button>
                    <Button onClick={() => handleDelreply(reply.commentId)}><ReplyDelete/></Button> 
                    <Time>{displayedAt(reply.createdAt)}</Time>
                    <Write>답글달기</Write>

                    <RecommentBtn
                      onClick={() => {
                        setDisplay(!display);
                      }}
                    >
                      답글0개더보기
                    </RecommentBtn>

                    {display && <Recomment id={reply.commentId} />}
                  </Content>
                </div>
              );
            })}
          </React.Fragment>
        );
      })}
      {isFetchingNextPage ? <>로딩중입니다</> : <div ref={ref}/> }
    </ReplyBox>
  );
}

export default ReplyComponent;

const ReplyBox = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  border-bottom: 1px solid #ccc;
  height: auto;
`;
const Profile = styled.img`
  width: 5rem;
  height: 5rem;
  float: left;
  margin-left: 50px;
  margin-bottom: 10px;
`;

const N_R = styled.div`
  width: 75%;
  margin-left: auto;
  word-break: break-all;
`;

const NickName = styled.p`
  margin: 10px;
  font-weight:bold ;
`;
const ReplyContent = styled.div`
  margin: 10px 0 0 10px;
  width: 90%;
`;

const ReplyText = styled.p`
  font-size:1rem`;

const Time = styled.div`
  display: inline-block;
  color: #999999;
  font-size: 15px;
  line-height: 14px;
  position: relative;
  left: 2rem;
`;

const Write = styled.button`
  color: #999999;
  font-size: 15px;
  line-height: 14px;
  background-color: transparent;
  border: 0;
  outline: 0;
  position: relative;
  left: 4rem;
`;

const RecommentBtn = styled.button`
  color: #999999;
  font-size: 15px;
  line-height: 14px;
  background-color: white;
  border: 0;
  outline: 0;
  position: relative;
  left: 4.5rem;
`;

const Button = styled.button`
  outline:0;
  border:0;
  `
  const Input = styled.input`
    width:20rem;
  height:3rem;
  border-radius:1rem;
  margin: 0rem 1rem`