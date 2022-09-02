import React, { useState } from "react";
import { Map, Polyline } from "react-kakao-maps-sdk";

const KakaoMap = ({ path }) => {
  return (
    <>
      <Map
        style={{
          width: "317px",
          height: "209px"
        }}
        center={path[path?.length - 1]}
        zoomable={false}
        draggable={false}
        level={3}
      >
        <Polyline
          path={path}
          strokeWeight={7}
          strokeColor={"#FFAE00"}
          strokeOpacity={0.7}
          strokeStyle={"solid"}
        />
      </Map>
    </>
  );
};

export default KakaoMap;
