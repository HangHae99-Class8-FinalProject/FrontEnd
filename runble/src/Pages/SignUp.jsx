import styled from "styled-components";
import ProfileUpload from "../Components/Signup/profileUpload";
import { useLocation } from "react-router-dom";

const SignUp = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <>
      <SignUpLogo>
        <p>RUNBLE</p>
      </SignUpLogo>
      <ProfileUpload userData={data} />
    </>
  );
};

export default SignUp;

const SignUpLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 96px;
  margin-bottom: 138px;
  & > P {
    height: 32px;
    font-weight: 900;
    font-size: 24px;
    line-height: 32px;
    color: #353434;
  }
`;
