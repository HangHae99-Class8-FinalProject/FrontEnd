import React from "react";
import Layout from "../Components/Common/Layout";
import Userprofile from "../Components/Userpage/Userprofile";
import Progress from "../Components/Userpage/Progress";
import FeedList from "../Components/Feed/FeedList/index ";
import Goal from "../Components/Userpage/Goal";

const UserPage = () => {
  return (
    <Layout>
      <Userprofile></Userprofile>
      {/* <Progress></Progress> */}
      <Goal></Goal>
      {/* <FeedList></FeedList> */}
    </Layout>
  );
};

export default UserPage;
