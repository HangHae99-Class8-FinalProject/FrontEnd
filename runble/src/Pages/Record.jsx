import React, { useState, useCallback } from "react";
import styled from "styled-components";

import KakaoMap from "../Components/KakaoMap";
import RunTimer from "../Components/RunTimer";

const Record = () => {
  const [stopInterval, setStopInterval] = useState(true);
  const [endRun, setEndRun] = useState(false);

  const stopRun = useCallback(() => {
    setStopInterval(prev => !prev);
  }, []);

  const onClickEnd = useCallback(() => {
    setEndRun(true);
    setStopInterval(true);
  });
  return (
    <>
      <RunTimer stopInterval={stopInterval} endRun={endRun} />
      <StopButton onClick={stopRun}>정지</StopButton>
      <StartButton onClick={stopRun}>시작</StartButton>
      <button onClick={onClickEnd}>끝내기</button>
      <KakaoMap stopInterval={stopInterval} endRun={endRun}></KakaoMap>
    </>
  );
};

export default Record;

const StopButton = styled.div``;

const StartButton = styled.div``;
