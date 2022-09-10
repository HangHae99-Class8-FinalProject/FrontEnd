export const REST_API_KEY = process.env.REACT_APP_KAKAO_CLIENT_ID;
export const REDIRECT_URI =  "http://localhost:3000/auth";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const KAKAO_LOGIN = 'http://54.167.169.43/api/kakao/login'


export const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID
export const NAVER_CALLBACK_URL = "http://localhost:3000/signup"

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${NAVER_CALLBACK_URL}`