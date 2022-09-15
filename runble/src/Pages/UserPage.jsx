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
  const { state } = useLocation();
  const accessToken = localStorage.getItem("userData");
  const parseData = JSON.parse(accessToken);
  const userNickname = parseData.nickname;
  const userId = parseData.userId;
  const userProfile = parseData.image;
  const [userIds, SetuserIds] = useState(state.userId || userId);
  const { status, data: goalData, error, isFetching } = useProgress(userIds); //user 목표보여주기
  console.log(state);
  console.log(userIds);
  return (
    <Layout>
      <Userprofile userId={userId} userIds={userIds} goalData={goalData} userNickname={userNickname}></Userprofile>
      {goalData?.result ? <Progress goalData={goalData}></Progress> : <Goal></Goal>}

      <UserList></UserList>
    </Layout>
  );
};

export default UserPage;
