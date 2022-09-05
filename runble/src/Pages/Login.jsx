import React from "react";
import styled from "styled-components"
import KakaoLogin from "../Components/Login/kakao/index"
import NaverLogin from "../Components/Login/naver/index"
import LoginGoogle from "../Components/Login/google/index"

const Login = () => {
  return (
    <LoginLayout>
      <KakaoLogin/>
      <NaverLogin/>
    </LoginLayout>
  )
};

export default Login;

const LoginLayout = styled.div`
  max-width: 490px;
  height: 968px;
  border: 1px solid black;
`

