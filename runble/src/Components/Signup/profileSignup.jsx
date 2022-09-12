import axios from 'axios';
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ProfileSignup = () => {
  const navigate = useNavigate();

  const kakaoLoign = async () => {
    const code = new URL(window.location.href).searchParams.get("code");
    const res = await axios
      .get(`http://54.167.169.43/api/kakao/callback?code=${code}}`)
      .then(res => {
        console.log(res.data);
        const token = res.data.token;
        if (token) {
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("userData", res.data);
          navigate(`/user/${res.data.nickname}}`);
        } else {
          navigate("/signup", {
            state: {
              email: res.data.email,
              image: res.data.image,
              nickname: res.data.nickname
            }
          });
        }
      });
    return res;
  };
  useEffect(() => {
    kakaoLoign();
  }, []);

  return <>로그인로딩중</>;
};

export default ProfileSignup;

