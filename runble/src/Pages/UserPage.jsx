import React from "react";
import Layout from "../Components/Common/Layout";
import Userprofile from "../Components/Userpage/Userprofile";
import Progress from "../Components/Userpage/Progress";
import Userfeed from "../Components/Feed/index ";

const UserPage = () => {
  return (
    <Layout>
      <Userprofile></Userprofile>
      <Progress></Progress>
      <Userfeed></Userfeed>
    </Layout>
  );
};

export default UserPage;
