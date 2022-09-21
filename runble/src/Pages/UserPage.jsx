import React from "react";
import Layout from "../Components/Common/Layout";
import Userprofile from "../Components/Userpage/Userprofile";
import Progress from "../Components/Userpage/Progress";
import UserList from "../Components/Userpage/UserList";
import Goal from "../Components/Userpage/Goal";
import { useProgress } from "../Hooks/useProgress";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const UserPage = () => {
  const { state } = useLocation({});
  const accessToken = localStorage.getItem("userData");
  const parseData = JSON.parse(accessToken);
  const userNickname = parseData.nickname;
  const userProfile = parseData.image;
  const userId = parseData.userId;

  const [userIds] = useState(state?.userId || userId);

  const { data: goalData } = useProgress(userIds); //user 목표보여주기
  return (
    <Layout>
      <Userprofile userProfile={userProfile} goalData={goalData} userNickname={userNickname}></Userprofile>
      {goalData?.result ? (
        <Progress done={goalData?.result} goalData={goalData}></Progress>
      ) : (
        <Goal done={goalData?.result} userNickname={userNickname}></Goal>
      )}
      <UserList></UserList>
    </Layout>
  );
};

export default UserPage;
