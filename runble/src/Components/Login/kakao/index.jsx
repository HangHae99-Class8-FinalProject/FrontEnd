import {KAKAO_AUTH_URL} from '../oauth';
import styled from "styled-components"
import {useLocation, useNavigate} from "react-router-dom"
import { useEffect } from 'react';
import axios from 'axios';

function KakaoLogin (){
  const location = useLocation();
  const navigate = useNavigate();
  //인가코드 가져오기
  const CODE = location.search.split('=')[1];



  //백엔드와 통신
useEffect(() => {
  (async () => {
    try {
      const res = await axios.get(`api/code=${CODE}`);
      const token = res.headers.authorization;
      console.log(token)
      window.localStorage.setItem('token', token);
      navigate('/signup');
    } catch (e) {
      console.error(e);
      navigate('/login');
    }
  })();
}, []);
  
    return(<>

         <Button href={KAKAO_AUTH_URL }>카카오로 로그인하기</Button>
         
           </>)
}

export default KakaoLogin


const Button = styled.a``