import ProfileUpload from "../Components/Signup/profileUpload"
import {useLocation, useNavigate} from "react-router-dom"
import { useEffect } from "react";
import styled from "styled-components";


const SignUp = () => {
  const location = useLocation();
  const data = location.state;
  console.log("data:", data);
  return (
    <SignupLayout>
      <ProfileUpload userData={data} />
    </SignupLayout>
  );
};

export default SignUp;

const SignupLayout = styled.div`
  max-width: 490px;
  height: 968px;
  border: 1px solid black;
`;
