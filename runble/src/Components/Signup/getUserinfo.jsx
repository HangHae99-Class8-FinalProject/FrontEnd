import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom"
import {REST_API_KEY,REDIRECT_URI} from "../Login/oauth"
import axios from 'axios';

function ProfileSignup (){

    const location = useLocation();
    const navigate = useNavigate();
    //인가코드 가져오기
    // const CODE = location.search.split('=')[1];

    const code = new URL(window.location.href).searchParams.get('code')
    console.log(code)
    //카카오 토큰 가져오기 및 저장

    useEffect(() => {
        (async () => {
          try {
            const res = await axios.get(`http://54.167.169.43/api/kakao/callback?code=${code}}`);
            console.log(res)
            const token = res.headers.authorization;
            console.log(token)
            window.localStorage.setItem('token', token);
            navigate('/auth');
          } catch (e) {
            console.error(e);
            navigate('/login');
          }
        })();
      }, []);



    
    return (
         <>
           로그인로딩중
         </>   
    )
}

export default ProfileSignup