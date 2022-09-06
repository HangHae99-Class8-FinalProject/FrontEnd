import React, { useState, useEffect } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue } from "recoil";
import { runData } from "../../../Recoil/Atoms/RunData";
import useInterval from "../../../hooks/useInterval";
import { getDistanceBetween } from "geolocation-distance-between";
import { useNavigate } from "react-router-dom";

const RunningMap = ({ stopInterval, endRun }) => {
  const [distance, setDistance] = useState(0);

  const navigate = useNavigate();

  const [path, setPath] = useRecoilState(runData);
  const runLog = useRecoilValue(runData);
  console.log(runLog);

  const [state, setState] = useState({
    center: {
      lat: "",
      lng: ""
    },
    errMsg: null,
    isLoading: false
  });

  // 이동 거리 구하기
  let polylinePath = path.path;
  const calcDistance = () => {
    let distanceBetween = 0;
    if (1 < polylinePath.length) {
      for (let i = 0; i < polylinePath.length; i++) {
        if (path.path.length - 1 === i) {
          distanceBetween += getDistanceBetween(
            { latitude: polylinePath[i]?.lat, longitude: polylinePath[i]?.lng },
            { latitude: polylinePath[i]?.lat, longitude: polylinePath[i]?.lng }
          );
        } else {
          distanceBetween += getDistanceBetween(
            { latitude: polylinePath[i]?.lat, longitude: polylinePath[i]?.lng },
            {
              latitude: polylinePath[i + 1]?.lat,
              longitude: polylinePath[i + 1]?.lng
            }
          );
        }
      }
    }
    setDistance(distanceBetween);
  };

  //사용자 첫 위 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          isLoading: true
        });
      });
    }
  }, []);

  // 위치 정보 가져오기 및 실시간 이동거리 계산 인터벌
  useInterval(
    () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          setState(prev => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude // 경도
            },
            isLoading: true
          }));
          setPath(prev => ({
            ...prev,
            path: prev.path.concat(state.center)
          }));
        });
      } else {
        setState(prev => ({
          ...prev,
          errMsg: "현재 위치를 표시할 수 없어요.",
          isLoading: false
        }));
      }
      calcDistance();
    },
    stopInterval ? null : 5000
  );

  //기록하기
  useEffect(() => {
    if (endRun) {
      setPath(prev => ({
        ...prev,
        distance: distance,
        isFinish: true
      }));
    }
    if (runLog.isFinish) {
      navigate("/post", { state: { runLog: path } });
    }
  }, [endRun, runLog.isFinish]);

  //로딩 화면
  if (!state.isLoading) {
    return <div>잠시만 기다려주세요.</div>;
  }

  return (
    <>
      {state.errMsg && <div>{state.errMsg}</div>}
      <Map
        center={state.center}
        style={{
          width: "100%",
          height: "50vh"
        }}
        level={1}
      >
        {state.isLoading && <MapMarker position={state.center} />}
        <Polyline
          path={runLog.path}
          strokeWeight={7}
          strokeColor={"#FFAE00"}
          strokeOpacity={0.7}
          strokeStyle={"solid"}
        />
        <div>총 거리 : {distance.toFixed(3)}</div>
      </Map>
    </>
  );
};

export default RunningMap;
