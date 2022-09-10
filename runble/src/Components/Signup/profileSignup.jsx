import React,{ useState ,useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom"
import {REST_API_KEY,REDIRECT_URI} from "../Login/oauth"
import axios from 'axios';

function ProfileSignup (){

    const location = useLocation();
    const navigate = useNavigate();

    //카카오 토큰 가져오기 및 저장
  
    const kakaoLoign = async()=>{
        const code = new URL(window.location.href).searchParams.get('code')
      const res = await axios.get(`http://54.167.169.43/api/kakao/callback?code=${code}}`).then((res)=>{
        console.log(res.data)
        
        const token = res.data.token

        if(token){
           window.localStorage.setItem('token' ,token)
           navigate('/user')
        }else{
          navigate('/signup',{state:res})
        }
        
      });

      return res;
    }
    useEffect(()=>{
      kakaoLoign();
    },[])
    return (
         <>
           로그인로딩중
         </>   
    )
}

export default ProfileSignup