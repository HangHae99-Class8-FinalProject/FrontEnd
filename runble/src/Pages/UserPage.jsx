import React from "react";
import Layout from "../Components/Common/Layout";
import Userprofile from "../Components/Userpage/Userprofile";
import Progress from "../Components/Userpage/Progress";
import UserList from "../Components/Userpage/UserList";
import Goal from "../Components/Userpage/Goal";

const UserPage = () => {
  const accessToken = localStorage.getItem("userData");
  const parseData = JSON.parse(accessToken);
  const nickname = parseData.nickname;
  return (
    <Layout feed={false}>
      <Userprofile nickname={nickname}></Userprofile>
      <Progress parseData={parseData}></Progress>
      <Goal></Goal>
      <UserList></UserList>
    </Layout>
  );
};

export default UserPage;
