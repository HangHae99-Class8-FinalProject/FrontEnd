import styled from "styled-components"
import ProfileSignup from "../Components/Signup/getUserinfo"
import ProfileUpload from "../Components/Signup/profileUpload"
import {useLocation, useNavigate} from "react-router-dom"
import { useEffect } from "react";

const SignUp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    //인가코드 가져오기
    const CODE = location.search.split('=')[1];

    const IP = ""

    //백엔드에 인가코드 보내고 JWT 토큰 받아오기
    // useEffect(()=>{
    //     fetch(`http://${IP}/users/kakao/redirect?code=${CODE}`, {
    //         method : 'GET' ,
    //     })
    //     .then(res => res.json())
    //     .then(data=>{
    //         localStorage.setItem('token', data.token);
    //         navigate('/signup')
    //     })
    // })
    return(
        <SignupLayout>
            <ProfileUpload/>
            {/* <ProfileSignup/>  */}
        </SignupLayout>
    )
};

export default SignUp;

const SignupLayout = styled.div`
  max-width: 490px;
  height: 968px;
  border: 1px solid black;
`
