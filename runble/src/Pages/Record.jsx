import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import RunTimer from "../Components/RecordPage/RunTimer";
import RunningMap from "../Components/RecordPage/RunningMap/index";
import { instance } from "../Utils/Instance";
import { runData } from "../Recoil/Atoms/RunData";
import { useNavigate } from "react-router-dom";

const Record = () => {
  const [stopInterval, setStopInterval] = useState(true);
  const [endRun, setEndRun] = useState(false);
  const runLog = useRecoilValue(runData);

  const navigate = useNavigate();

  const stopRun = useCallback(() => {
    setStopInterval(prev => !prev);
  }, []);

  const onClickEnd = useCallback(() => {
    setEndRun(true);
    setStopInterval(true);
  });

  const onFeed = () => {
    if (runLog.isFinish) {
      navigate("/post", { state: { runLog } });
    }
  };

  const onNotFeed = async () => {
    const { data } = await instance.post("/api/user/distance", {
      distance: runLog.distance
    });
    if (data.result) {
      navigate("/feed");
    }
  };

  return (
    <>
      <RunTimer stopInterval={stopInterval} endRun={endRun} />
      <StopButton onClick={stopRun}>정지</StopButton>
      <StartButton onClick={stopRun}>시작</StartButton>
      <button onClick={onClickEnd}>끝내기</button>
      <RunningMap stopInterval={stopInterval} endRun={endRun}></RunningMap>
      <div>
        <p>기록을 피드에 공유 하시겠습니까?</p>
        <button onClick={onFeed}>네</button>
        <button onClick={onNotFeed}>아니오</button>
      </div>
    </>
  );
};

export default Record;

const StopButton = styled.div``;

const StartButton = styled.div``;
