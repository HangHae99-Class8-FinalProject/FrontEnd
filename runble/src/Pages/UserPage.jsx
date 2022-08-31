import React from "react";
import Layout from "../Components/Common/Layout";
import Userprofile from "../Components/Userpage/Userprofile";
import Progress from "../Components/Userpage/Progress";
import Post from "../Components/Userpage/Post";

const UserPage = () => {
  return (
    <Layout>
      <Userprofile></Userprofile>
      <Progress></Progress>
      <Post></Post>
    </Layout>
  );
};

export default UserPage;
