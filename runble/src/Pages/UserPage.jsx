import React, { useEffect } from "react";

import Layout from "../Components/Common/Layout";
import Userprofile from "../Components/Userpage/Userprofile";
import Progress from "../Components/Userpage/Progress";
import UserList from "../Components/Userpage/UserList";
import Goal from "../Components/Userpage/Goal";
import EventModal from "../Components/Common/EventModal";

import { useProgress } from "../Hooks/useProgress";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { instance } from "../Utils/Instance";

const UserPage = () => {
  const [showEventModal, setShowEventModal] = useState(true);
  const { state } = useLocation({});
  const accessToken = localStorage.getItem("userData");
  const parseData = JSON.parse(accessToken);
  const userNickname = parseData.nickname;
  const userId = parseData.userId;

  const [userIds] = useState(state?.userId || userId);

  const { data: goalData } = useProgress(userIds); //user 목표보여주기

  useEffect(() => {
    async function getShowEvent() {
      const res = await instance.get("/api/user/research");
      setShowEventModal(res.data?.result);
    }
    getShowEvent();
  }, []);
  console.log(showEventModal);

  return (
    <>
      {!showEventModal && <EventModal />}
      <Layout>
        <Userprofile goalData={goalData} userNickname={userNickname}></Userprofile>
        {goalData?.result ? <Progress goalData={goalData}></Progress> : <Goal userNickname={userNickname}></Goal>}
        <UserList></UserList>
      </Layout>
    </>
  );
};

export default UserPage;
