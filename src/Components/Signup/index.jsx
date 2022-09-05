import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom"
import {REST_API_KEY,REDIRECT_URI} from "../Login/oauth"

function profileSignup (){
    const [user_id, setUserId] = useState();
    const [nickName, setNickName] = useState();
    const [profileImage, setProfileImage] = useState();
    const [userData,setUserData] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    //인가코드 가져오기
    const CODE = location.search.split('=')[1];

    //카카오 토큰 가져오기 및 저장

    const getKakaoToken = () => {
        fetch(`https://kauth.kakao.com/oauth/token`,{
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${CODE}`
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            if(data.access_token){
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('refresh_token', data.refresh_token)
            }else{
                navigate('/login')
            }

        })
    }




    const UserProfile = () => {
        window.location.href.includes('access_token') && GetUser();
        function GetUser() {
          const location = window.location.href.split('=')[1];
          const token = location.split('&')[0];
          console.log("token: ", token);

          //백엔드에 get 요청으로 JWT TOKEN 받아옴
          fetch(`https://openapi.naver.com/vi/nid/me` , {
            method: "POST",
            headers : {
              "Content-type" : "application/json",
              "Authorization": token
            },
          })
          .then(res => res.json())
          .then(res => {
            console.log(res)
            localStorage.setItem("access_token", res.token);
            setUserData({
              nickname : res.nickname,
              image : res.image
            })
          })
          .catch(err => console.log("err : ", err));
        }
      };


    useEffect(()=>{

        if(!location.search) return;
        getKakaoToken()
        UserProfile()
    },[]
    );
    
    return (
         <>
            회원가입 페이지
         </>   
    )
}

export default profileSignup