import styled from "styled-components"
import ProfileSignup from "../Components/Signup/getUserinfo"
import ProfileUpload from "../Components/Signup/profileUpload"
import {useLocation, useNavigate} from "react-router-dom"
import { useEffect } from "react";

const SignUp = () => {
   
    return(
        <SignupLayout>
            <ProfileUpload/>
            <ProfileSignup/>  
        </SignupLayout>
    )
};

export default SignUp;

const SignupLayout = styled.div`
  max-width: 490px;
  height: 968px;
  border: 1px solid black;
`
