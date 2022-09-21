import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../Icons/BackIcon.svg";
import useInput from "../Hooks/useInput";
import { instance } from "../Utils/Instance";
import Loading from "../Components/Common/Loading/Loading";

const Report = () => {
  const [reportContent, onChangeContent] = useInput("");
  const [isLoading, setIsLoading] = useState(false);

  const textRef = useRef(null);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (textRef.current !== null) textRef.current.focus();
  });

  const onClickSubmit = async () => {
    const res = instance.post("/api/user/report/bug", { content: reportContent });
    setIsLoading(true);
    return res;
  };

  useEffect(() => {
    if (isLoading) {
      const LoadingScreen = setTimeout(() => {
        navigate("/feed");
      }, 2000);
      return () => clearTimeout(LoadingScreen);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading>신고가 접수되었어요</Loading>;
  }

  return (
    <>
      <ReportHeader>
        <HeaderItems>
          <div
            onClick={() => {
              navigate(-1);
            }}
          >
            <BackIcon />
          </div>
          <div>문제 신고</div>
          <div onClick={onClickSubmit}>완료</div>
        </HeaderItems>
      </ReportHeader>
      <ReportBody>
        <BodyTitle>
          <div>
            무슨 문제가 있었나요? <br />
            자세히 알려주세요 <br />
          </div>
        </BodyTitle>
        <ReportArea ref={textRef} value={reportContent} onChange={onChangeContent} />
      </ReportBody>
    </>
  );
};

export default Report;

const ReportHeader = styled.div`
  display: flex;
  align-items: flex-start;
  height: 4.3rem;
`;

const HeaderItems = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.6rem;
  width: 100%;
  border-bottom: 0.1rem solid #e6e6e6;
  & div {
    font-size: 1.6rem;
    line-height: 2.3rem;
  }
  & > div:last-child {
    color: #f03800;
  }
`;

const ReportBody = styled.div`
  padding: 0 4rem;
`;

const BodyTitle = styled.div`
  width: 100%;
  margin: 10rem 0;
  height: 20%;
  text-align: center;
  font-size: 2.6rem;
  color: rgba(0, 0, 0, 0.5);
`;

const ReportArea = styled.textarea`
  background: #e6e6e6;
  border-radius: 0.4rem;
  padding: 1.5rem 0 1.5rem 1.5rem;
  width: 100%;
  height: 28rem;
  font-size: 1.8rem;
  &:focus {
    outline: none;
  }
`;
