import React, { useState } from "react";
import styled from "styled-components"
import Lion from "./lion.png"
import { QueryClient, useMutation, useQuery } from 'react-query';
import Recomment from "./Recomment"



function ReplyComponent ({reply}) {

    return(
        <ReplyBox>
            <Content>
                 <Profile src={Lion}></Profile>
                 <N_R>
                    <NickName>{reply.nickname}</NickName>   
                    <ReplyContent>{reply.comment}</ReplyContent>
                 </N_R>
            </Content>
            <Recomment replyCount={reply.recommentCount} id={reply.commentId}/>
        </ReplyBox>
    )
}

export default ReplyComponent

const ReplyBox = styled.div`
    width: 100%;
    background-color: #eee;
    margin-bottom:20px;
`

const Content = styled.div`
`
const Profile = styled.img`
    width: 50px;
    height: 50px;
    float: left;
`

const N_R = styled.div`

`
const NickName = styled.h4`

    margin: 0 10px;
    
`
const ReplyContent = styled.p`
  display: inline-block;
    margin: 10px 0 0 10px;
`