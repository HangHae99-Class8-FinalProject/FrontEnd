import React,{ useState,useEffect } from "react";
import { useMutation,useQueryClient,useQuery } from "react-query";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

import useInfinityScroll from "../../Hooks/useInfinityScroll";
import {addReply } from "../../Hooks/useRecomment";
import RecommentItem  from "./recommentItem"
import {instance} from "../../Utils/Instance"


function Recomment({id}) {

  const [ref, inView] = useInView();

  const onSuccess = () => {
    console.log("조회성공");
  };

  const onError = () => {
    console.log("조회실패");
  };

  const [recommentId,setRecommentId] = useState(0)

  const getRecomment = async (pageParam) => {
    setRecommentId(recommentId+1)
    console.log(pageParam)
    const response = await instance.get(`http://54.167.169.43/api/comment/${id}/${pageParam}`);
    console.log(response.data)
    return response.data;
  }


  const [data, fetchNextPage, isFetchingNextPage] = useInfinityScroll(
    "GET_RECOMMENT",
    getRecomment,
    {onSuccess,onError}
  );

  console.log(data)

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  const queryClient = useQueryClient();
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

  const handleAddreply = recommentId => {
    console.log(recommentId)
    addReplyData.mutate({
      commentId: id,
      recommentId:recommentId,
      comment: replyValue,
    });
    setReplyValue("");
  };


  return (
      <ReplyBox>
      {data?.pages.map((page, i)=>{
        // console.log(page.Recomment[i].commentId)
         return  (
          <React.Fragment key={i}>
               <input
            type="text"
            value={replyValue}
            onChange={e => setReplyValue(e.target.value)}
          />
          <button onClick={()=>handleAddreply}>대댓글추가</button>
          {page?.Recomment.map(reply => {
            console.log(reply)
            if (id === reply.commentId) {
              return (
                <Content key={reply.recommentId}>
                
                  <RecommentItem data={reply}/>
          
                </Content>
              );
            }
          })}
          </React.Fragment>
        )
      
      
      })}  
  </ReplyBox>
  )
}

export default Recomment;

const ReplyBox = styled.div`
  width: 100%;
`

const Content = styled.div`
  margin-left: 4rem;
  margin-bottom: 1rem;
`;

