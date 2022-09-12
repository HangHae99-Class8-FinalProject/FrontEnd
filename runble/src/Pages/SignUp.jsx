import styled from "styled-components";
import ProfileUpload from "../Components/Signup/profileUpload";
import { useLocation } from "react-router-dom";

const SignUp = () => {
  const location = useLocation();
  const data = location.state;

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
