import axios from "axios";

export const instance = axios.create({

  baseURL: "http://54.167.169.43",
  withCredentials: true
});

instance.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    config.headers.common["Authorization"] = ` ${accessToken}`;
  }
  return config;
});

