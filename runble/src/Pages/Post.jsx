import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import KakaoMap from "../Components/Common/KakaoMap";
import Hashtag from "../Components/PostPage/Hashtag";
import AddPhoto from "../Components/PostPage/AddPhoto";

const Post = () => {
  const location = useLocation();
  const { runLog } = location.state;
  const Time = runLog.time;

  return (
    <>
      <div>
        {Time.hour} :{Time.minute} :{Time.second}
      </div>
      <div>{runLog.distance.toFixed(3)}km</div>
      <MapBox>
        <KakaoMap path={runLog.path} />
      </MapBox>
      <AddPhoto> + </AddPhoto>
      <Hashtag></Hashtag>
    </>
  );
};

export default Post;

const MapBox = styled.div`
  width: 317px;
  height: 209px;
  left: 29px;
  top: 147px;
`;
