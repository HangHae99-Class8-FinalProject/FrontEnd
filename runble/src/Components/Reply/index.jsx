import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../Icons/BackIcon.svg";

import PostItem from "./postItem";
import ReplyComponent from "./replyComponent";
import { postLoading } from "../../Recoil/Atoms/PostLoading";
import { useRecoilValue } from "recoil";
import Loading from "../Common/Loading/Loading";

const ReplyCom = () => {
  const { isLoading } = useRecoilValue(postLoading);

  const location = useLocation();
  const data = location.state;

  const navigate = useNavigate();

  return (
    <>
      {isLoading && <Loading>답글을 작성하고 있어요</Loading>}
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
      <>
        <PostItem data={data} />
        <ReplyComponent />
      </>
    </>
  );
};

export default ReplyCom;

const HeaderWrap = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0rem;
  height: 4.3rem;
`;

const HeaderItems = styled.div`
  display: flex;
  padding: 1rem 1.6rem;
  width: 100%;
  border-bottom: 0.1rem solid #e6e6e6;
  & div {
    font-size: 1.6rem;
    line-height: 2.3rem;
    width: 46.8%;
  }
`;
