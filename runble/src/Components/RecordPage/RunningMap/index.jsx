import React, { useState, useEffect } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue } from "recoil";

import { runData } from "../../../Recoil/Atoms/RunData";
import useInterval from "../../../Hooks/useInterval";
import calcDistance from "../../../Utils/clacDistnace";
import Marker from "../../../Icons/Map_Marker.svg";
import Loading from "../../Common/Loading/Loading";

const RunningMap = ({ stopInterval, endRun }) => {
  const { kakao } = window;
  const [distance, setDistance] = useState(0);

  const [path, setPath] = useRecoilState(runData);
  const runLog = useRecoilValue(runData);

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
        setDistance(calcDistance(path));
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
              path: prev.path.concat(state.center),
              distance: distance?.toFixed(1)
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
    },
    stopInterval ? null : 5000
  );

  //기록하기
  useEffect(() => {
    if (endRun) {
      setPath(prev => ({
        ...prev,
        distance: distance?.toFixed(1),
        isFinish: true
      }));
    }
  }, [endRun]);

  let imageSrc = Marker;

  //로딩 화면
  if (!state.isLoading) {
    return (
      <Loading>
        <div>지도 정보를 가져오고 있어요</div>
      </Loading>
    );
  }

  return (
    <>
      <Map
        center={state.center}
        style={{
          width: "100vw",
          height: "100vh"
        }}
        level={2}
        zoomable={false}
        draggable={false}
      >
        {state.isLoading && (
          <MapMarker
            position={state.center}
            image={{ src: imageSrc, size: { width: 36, height: 36 } }}
          />
        )}
        <Polyline
          path={runLog.path}
          strokeWeight={7}
          strokeColor={"##F03800"}
          strokeOpacity={0.7}
          strokeStyle={"solid"}
        />
      </Map>
    </>
  );
};

export default RunningMap;
