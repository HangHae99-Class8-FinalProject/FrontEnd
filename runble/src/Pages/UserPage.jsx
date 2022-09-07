import React from "react";
import Layout from "../Components/Common/Layout";
import Userprofile from "../Components/Userpage/Userprofile";
import Progress from "../Components/Userpage/Progress";
import UserList from "../Components/Userpage/UserList";
import Goal from "../Components/Userpage/Goal";

const UserPage = () => {
  return (
    <Layout>
      <Userprofile></Userprofile>
      <Progress></Progress>
      <Goal></Goal>
      <UserList></UserList>
    </Layout>
  );
};

export default UserPage;
