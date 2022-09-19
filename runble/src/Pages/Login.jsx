import React from "react";
import styled from "styled-components";

import Loading from "../Components/Common/Loading/Loading";
import { ReactComponent as KakaoLoginIcon } from "../Icons/KakaoLoginIcon.svg";
import { ReactComponent as Logo } from "../Icons/LoginLogo.svg";

const KAKAO_LOGIN = "http://54.167.169.43/api/kakao/login";

const Login = () => {
  return (
    <>
      <LoginLogo>
        <Logo />
      </LoginLogo>
      <LoginLink href={KAKAO_LOGIN}>
        <KakaoLoginIcon />
      </LoginLink>
      {/* <Loading>테스트 하고 있어요</Loading> */}
    </>
  );
};

export default Login;

const LoginLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem 0rem 0rem;
  height: 24.5rem;
  width: 24.5rem;

  position: absolute;
  left: 6.5rem;
  top: 17.6rem;
`;

const LoginLink = styled.a`
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
