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
    <Body>
      <HeaderWrap>
        <HeaderItems>
          <div
            onClick={() => {
              navigate("/feed");
            }}
          >
            <BackIcon />
          </div>
          <div>답글</div>
        </HeaderItems>
      </HeaderWrap>
      <PostItem data={data} />
      <ReplyComponent />
    </Body>
  );
};

export default ReplyCom;

const Body = styled.div`
  overflow-x: hidden;
`;
const HeaderWrap = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0rem;
  height: 4.3rem;
`;

const Head = styled.div`
  width: 100%;
  height: 4.3rem;
  border-bottom: 1px solid #111;
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

