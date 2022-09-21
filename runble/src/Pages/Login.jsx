import React from "react";
import styled from "styled-components";

import { ReactComponent as KakaoLoginIcon } from "../Icons/KakaoLoginIcon.svg";
import { ReactComponent as NaverLoginIcon } from "../Icons/NaverLoginIcon.svg";

import {KAKAO_LOGIN, NAVER_LOGIN} from "../Components/Login/oauth"

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
  padding: 1.2rem 0rem 0rem;

  position: absolute;
  width: 24.5rem;
  height: 10.4rem;
  left: 6.5rem;
  top: 17.6rem;
`;

const LoginKakaoLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  gap: 1rem;
  position: absolute;
  width: 26rem;
  left: 5.8rem;
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
