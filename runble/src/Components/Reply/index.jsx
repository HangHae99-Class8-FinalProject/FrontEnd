import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../Icons/BackIcon.svg";

import PostItem from "./postItem";
import ReplyComponent from "./replyComponent";

const ReplyCom = () => {
  const location = useLocation();
  const data = location.state;

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
        <ReplyComponent />
        <ReplyArea>
          <Detail />
        </ReplyArea>
      </Wrap>
    </>
  );
};

export default ReplyCom;

const Wrap = styled.div`
  margin: 0px;
  height: 100rem;
  width: 37.5rem;
  min-width: 39rem;
  border-right: 1px solid black;
`;

const Head = styled.div`
  width: 100%;
  height: 43px;
  border-bottom: 1px solid #111;
`;

const Back = styled.div`
  float: left;
  margin: 15px 20px;
`;

const ReplyText = styled.div`
  display: inline-block;
  font-size: 20px;
  margin: 10px 150px;
`;

const Detail = styled.div`
  border: 0.1rem solid black;
  margin-top: 40rem;
`;

const ReplyArea = styled.div`
  margin: 2rem;
`;
