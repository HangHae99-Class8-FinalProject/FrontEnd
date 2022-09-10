import {KAKAO_AUTH_URL} from '../oauth';
import {KAKAO_LOGIN} from "../oauth";
import styled from "styled-components"
import axios from 'axios';
import { useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom"



function KakaoLogin (){


  
    return(<>

         <Button href={KAKAO_LOGIN}>카카오로 로그인하기</Button>
         
           </>)
}

export default KakaoLogin


const Button = styled.a``