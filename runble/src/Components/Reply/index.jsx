import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon} from "../../Icons/BackIcon.svg"

import PostItem from "./postItem";
import ReplyComponent from "./replyComponent";

const ReplyCom = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data)

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
        <PostItem data={data} />
        {display == true ? <>댓글이 없습니다.</>: <ReplyComponent />}
      </Wrap>
    </>
  );
};

export default ReplyCom;

const Wrap = styled.div`
  margin: 0px;
  height: 100rem;
  min-width:39rem;
  border-right: 1px solid black ;
`;

const Head = styled.div`
  width: 100%;
  height: 4.3rem;
  border-bottom: 1px solid #111;
`;

const Back = styled.div`
  float: left;
  margin: 1.5rem 2rem;
`;

const ReplyText = styled.div`
  display: inline-block;
  font-size: 2rem;
  margin:0.5rem 13rem;
`;

