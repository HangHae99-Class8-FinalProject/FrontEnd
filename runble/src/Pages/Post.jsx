import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import KakaoMap from "../Components/Common/KakaoMap";
import Hashtag from "../Components/PostPage/Hashtag";

const Post = () => {
  const location = useLocation();
  const { runLog } = location.state;
  const Time = runLog.time;

  console.log(runLog);

  return (
    <>
      <div>
        {Time.hour} :{Time.minute} :{Time.second}
      </div>
      <div>{runLog.distance.toFixed(3)}km</div>
      <MapBox>
        <KakaoMap path={runLog.path} />
      </MapBox>
      <PhotoButton> + </PhotoButton>
      <Hashtag></Hashtag>
    </>
  );
};

export default Post;

const MapBox = styled.div`
  /* position: absolute; */
  width: 317px;
  height: 209px;
  left: 29px;
  top: 147px;
`;

const PhotoButton = styled.div`
  /* position: absolute; */
  width: 59px;
  height: 55.87px;
  left: 28px;
  top: 366.57px;
  background: #d9d9d9;
`;
