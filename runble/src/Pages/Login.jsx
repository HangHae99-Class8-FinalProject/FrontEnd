import React from "react";
import styled from "styled-components";
import { KAKAO_LOGIN } from "../Components/Login/oauth";

import { ReactComponent as KakaoLoginIcon } from "../Icons/KakaoLoginIcon.svg";
import { ReactComponent as NaverLoginIcon } from "../Icons/NaverLoginIcon.svg";
import { ReactComponent as Logo } from "../Icons/LoginLogo.svg";


const KAKAO_LOGIN = "http://3.34.45.149/api/kakao/login";
const NAVER_LOGIN = "http://3.34.45.149/api/naver/login";

const Login = () => {
  return (
    <>
      <LoginLogo>Runble</LoginLogo>
      <LoginKakaoLink href={KAKAO_LOGIN}>
        <KakaoLoginIcon />
      </LoginKakaoLink>
      <LoginNaverLink href={NAVER_LOGIN}>
        <NaverLoginIcon />
      </LoginNaverLink>
    </>
  );
};

export default Login;

const LoginLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 10rem;
  padding: 1.2rem 0rem 0rem;
  height: 24.5rem;
  width: 100%;
  overflow: hidden;
`;

const LoginKakaoLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem;
  gap: 1rem;
  position: absolute;
  bottom: 8.1rem;
`;

const LoginNaverLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  gap: 1rem;
  position: absolute;
  width: 26rem;
  left: 5.8rem;
  bottom: 14.1rem;
`;
