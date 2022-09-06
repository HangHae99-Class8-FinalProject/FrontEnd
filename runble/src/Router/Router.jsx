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
        <Route path="/reply" element={<Reply />} />
        <Route path="/search" element={<Search />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
