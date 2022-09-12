import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../Utils/Instance";
import axios from "axios";

const ProfileSignup = () => {
  const navigate = useNavigate();

  const kakaoLoign = async () => {
    const code = new URL(window.location.href).searchParams.get("code");
    const res = await instance
      .get(`/api/kakao/callback?code=${code}}`)
      .then(res => {
        const token = res.data.token;
        const userData = {
          email: res.data.email,
          image: res.data.image,
          nickname: res.data.nickname,
          userId: res.data.userId
        };
        if (token) {
          console.log(res.data);
          window.localStorage.setItem("token", token);

          window.localStorage.setItem("userData", JSON.stringify(userData));
          navigate(`/user/${res.data.nickname}`);
        } else {
          console.log(res.data);
          navigate("/signup", {
            state: {
              email: res.data.email
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
