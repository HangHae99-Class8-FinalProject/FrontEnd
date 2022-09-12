import axios from "axios";

export const instance = axios.create({
  // baseURL: "http://localhost:3001/",
  withCredentials: true
});


instance.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
  config.headers.common["Authorization"] = ` ${accessToken}`;
  }
  return config;
  });