import {KAKAO_AUTH_URL} from '../oauth';
import styled from "styled-components"
import {useLocation, useNavigate} from "react-router-dom"

function KakaoLogin (){
  const location = useLocation();
  const navigate = useNavigate();
  //인가코드 가져오기
  const CODE = location.search.split('=')[1];

//백엔드와 통신


    return(<>
        
        
         <Button href={KAKAO_AUTH_URL}>카카오로 로그인하기</Button>
         
           </>)
}

export default KakaoLogin


const Button = styled.a``