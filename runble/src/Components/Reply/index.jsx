import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { QueryClient, useMutation, useQuery } from 'react-query';
import { instance } from "../../Utils/Instance";
import styled from "styled-components"
import ReplyComponent from "./replyComponent"
import {addReplyData} from "../../Hooks/useReply"
import uuid from "react-uuid"



const getReply = async () =>{
    return await instance.get('http://localhost:8000/Comment');
};

const ReplyCom = () => {
    const [replyValue,setReplyValue]= useState('');
    
    const onSuccess = () => {
        console.log('perform side effect after data fetching');
      };
    
      const onError = () => {
        console.log('perform side effect after encountering error');
      };

      const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
        'GET_REPLY',
        getReply,
        {
          onSuccess,
          onError,
        },
      );

      console.log(data?.data)
    
   const {mutate} = addReplyData();

   const handleAddreply = (e)=>{
    e.preventDefault();
    const initalState =  {
        "id":0,
        "commentId": uuid(),
        "nickname" : "기린",
        "profile":"",
        "comment" : replyValue,
       "recommentCount": 0
      }
    mutate(initalState);
    setReplyValue('')

   }
    return(
        <>
            <Wrap>
                <Detail/>
                    <input 
                        type="text" 
                        value={replyValue}
                        onChange={(e)=>setReplyValue(e.target.value)}
                        />
                    <button onClick={handleAddreply}>댓글추가</button>

                    <ReplyArea>
                    {
                            data?.data.map((reply)=>{
                                return(
                                
                                    <ReplyWrap key={reply.commentId}>
                                        <ReplyComponent reply={reply}/>
                                    </ReplyWrap>
                                    
                                )
                            })
                        }
                    </ReplyArea>
         
            </Wrap>
            
          

        </>
    )

};

export default ReplyCom;

const Wrap = styled.div`
    margin: 20px;
    border: 1px solid black;
    height:1000px;
`

const Detail = styled.div`
      border: 1px solid black;
      margin-top: 400px;
`

const ReplyArea = styled.div`
      margin: 20px;
`

const ReplyWrap = styled.div`
      margin: 10px;
`
