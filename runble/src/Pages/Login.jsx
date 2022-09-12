import React from "react";
import styled from "styled-components";
import KakaoLogin from "../Components/Login/kakao/index";

const Login = () => {
  return (
    <LoginLayout>
      <KakaoLogin />
    </LoginLayout>
  );
};

export default Login;

const LoginLayout = styled.div`
  max-width: 490px;
  height: 968px;
  border: 1px solid black;
`;
