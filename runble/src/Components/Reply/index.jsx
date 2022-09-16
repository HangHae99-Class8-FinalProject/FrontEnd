import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../Icons/BackIcon.svg";

import PostItem from "./postItem";
import ReplyComponent from "./replyComponent";

const ReplyCom = () => {
  const location = useLocation();
  const data = location.state;

  const [display, setDisplay] = useState(false);



  const navigate = useNavigate();

  return (
    <>
      <Wrap>
        <Head>
          <Back
            onClick={() => {
              navigate("/feed");
            }}
          >
            <BackIcon />
          </Back>
          <ReplyText>
            <span>댓글</span>
          </ReplyText>
        </Head>
        <Body>
            <PostItem data={data} />
            {display == true ? <>댓글이 없습니다.</>: <ReplyComponent />}
        </Body>
      </Wrap>
  
    
    </>
  );
};

export default ReplyCom;

const Wrap = styled.div`
  height:100%;
`;

const Head = styled.div`
  width: 100%;
  height: 4.3rem;
  border-bottom: 1px solid #e6e6e6;
`;

const Back = styled.div`
  float: left;
  position:relative;
  left:1rem;
  top:1rem
`;

const ReplyText = styled.div`
  display: inline-block;
  font-size: 2rem;
  margin:0.5rem 16rem;
`;

const Body = styled.div`
`

