import React, { useState, useEffect } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue } from "recoil";
import { runData } from "../../../Recoil/Atoms/RunData";
import useInterval from "../../../Hooks/useInterval";

import calcDistance from "../../../Utils/clacDistnace";

const RunningMap = ({ stopInterval, endRun }) => {
  const [distance, setDistance] = useState(0);

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

  //사용자 첫 위 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setState({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            isLoading: true
          });
        },
        error => {
          console.log(error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setState(prev => ({
        ...prev,
        errMsg: "현재 위치를 표시할 수 없어요.",
        isLoading: false
      }));
    }
  }, []);

  // 위치 정보 가져오기 및 실시간 이동거리 계산 인터벌
  useInterval(
    () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
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
          },
          error => {
            console.log(error);
          },
          { enableHighAccuracy: true, timeout: 4000 }
        );
      } else {
        setState(prev => ({
          ...prev,
          errMsg: "현재 위치를 표시할 수 없어요.",
          isLoading: false
        }));
      }
      //이동거리구하기
      setDistance(calcDistance(path));
    },
    stopInterval ? null : 5000
  );

  //기록하기
  useEffect(() => {
    if (endRun) {
      setPath(prev => ({
        ...prev,
        distance: distance?.toFixed(2),
        isFinish: true
      }));
    }
  }, [endRun]);

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
        zoomable={false}
        draggable={false}
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
