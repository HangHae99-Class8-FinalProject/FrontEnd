import React from "react";
import { useState } from "react";
import styled from "styled-components"
import ReplyComponent from "./replyComponent"
import {addReplyData} from "../../Hooks/useReply"

const ReplyCom = () => {
    const [replyValue,setReplyValue]= useState('');
    const [commentIdCnt, setCommentIdCnt] = useState(1);

const {mutate} = addReplyData();
   const handleAddreply = (e)=>{
    e.preventDefault();
    setCommentIdCnt(commentIdCnt+1)
    const initalState =  {
        "commentId": commentIdCnt,
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
                        <ReplyComponent/>
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
