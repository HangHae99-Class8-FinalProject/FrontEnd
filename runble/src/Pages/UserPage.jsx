import React from "react";
import Layout from "../Components/Common/Layout";
import Userprofile from "../Components/Userpage/Userprofile";
import Progress from "../Components/Userpage/Progress";
import UserList from "../Components/Userpage/UserList";
import Goal from "../Components/Userpage/Goal";
import { useProgress } from "../Hooks/useProgress";

const UserPage = () => {
  const accessToken = localStorage.getItem("userData");
  const parseData = JSON.parse(accessToken);
  const userNickname = parseData.nickname;
  const userId = parseData.userId;
  const { status, data: goalData, error, isFetching } = useProgress(userId); //user 목표보여주기
  console.log(goalData);
  return (
    <Layout>
      <Userprofile userNickname={userNickname}></Userprofile>
      {goalData?.result ? (
        <Progress goalData={goalData}></Progress>
      ) : (
        <Goal></Goal>
      )}

      <UserList></UserList>
    </Layout>
  );
};

export default UserPage;
