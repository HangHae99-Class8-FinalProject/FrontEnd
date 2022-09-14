import React from "react";
import styled from "styled-components";
import KakaoLogin from "../Components/Login/kakao/index";
import { KAKAO_LOGIN } from "../Components/Login/oauth";

import { ReactComponent as KakaoLoginIcon } from "../Icons/KakaoLoginIcon.svg";

const Login = () => {
  return (
    <>
      <LoginLogo>Runble</LoginLogo>
      <LoginLink href={KAKAO_LOGIN}>
        <KakaoLoginIcon />
      </LoginLink>
    </>
  );
};

export default Login;

const LoginLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0px 0px;

  position: absolute;
  width: 245px;
  height: 104px;
  left: 65px;
  top: 176px;
`;

const LoginLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  position: absolute;
  width: 260px;
  left: 58px;
  top: 609px;
`;
