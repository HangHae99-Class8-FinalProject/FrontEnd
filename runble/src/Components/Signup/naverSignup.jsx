import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { instance } from "../../Utils/Instance";
import Loading from "../Common/Loading/Loading";

const NaverSignup = () =>{
    const navigate = useNavigate();

    const location = useLocation();

const code = location.search.split('=')[1];
const state = location.search.split('=')[2];

console.log(code)
console.log(state)

const naverLogin = async () => {
    const res = await instance.get(`/api/naver/callback?code=${code}&state=${state}`).then((res)=>{
        console.log(res.data);
    })
    return res;
}

useEffect(()=>{
    naverLogin();
})

    return(
        <>로그인중입니다.</>
    )
}

export default NaverSignup;