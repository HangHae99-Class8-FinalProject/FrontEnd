import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../Pages/Login";
import Feed from "../Pages/Feed";
import Post from "../Pages/Post";
import Record from "../Pages/Record";
import Reply from "../Pages/Reply";
import Search from "../Pages/Search";
import SignUp from "../Pages/SignUp";
import UserPage from "../Pages/UserPage";
import ProfileSignup from "../Components/Signup/profileSignup";
import Rank from "../Pages/Rank";
import BugReport from "../Pages/BugReport";
import PostReport from "../Pages/PostReport";
import ErrorPage from "../Pages/ErrorPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/record" element={<Record />} />
        <Route path="/reply/:id" element={<Reply />} />
        <Route path="/reply" element={<Reply />} />
        <Route path="/search" element={<Search />} />
        <Route path="/api/kakao/callback" element={<ProfileSignup />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/:nickname" element={<UserPage />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/bugreport" element={<BugReport />} />
        <Route path="/postreport" element={<PostReport />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
