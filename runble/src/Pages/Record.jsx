import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import RunTimer from "../Components/RecordPage/RunTimer";
import RunningMap from "../Components/RecordPage/RunningMap/index";
import { instance } from "../Utils/Instance";
import { runData } from "../Recoil/Atoms/RunData";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/RecordPage/Modal";

import { ReactComponent as StopIcon } from "../Icons/StopIcon.svg";
import { ReactComponent as EndIcon } from "../Icons/EndIcon.svg";
import { ReactComponent as StartIcon } from "../Icons/play_arrow.svg";

const Record = () => {
  const [stopInterval, setStopInterval] = useState(true);
  const [endRun, setEndRun] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [start, setStart] = useState(false);
  const runLog = useRecoilValue(runData);
  console.log(runLog);

  const navigate = useNavigate();

  const stopRun = useCallback(() => {
    setStopInterval(prev => !prev);
  }, []);

  const onStart = useCallback(() => {
    setShowModal(false);
    setStopInterval(false);
    setStart(true);
  }, []);

  const onClickEnd = useCallback(async () => {
    setEndRun(true);
    setStopInterval(true);
    const { data } = await instance.post("/api/user/distance", {
      distance: runLog.distance
    });
  });

  const onFeed = () => {
    if (runLog.isFinish) {
      navigate("/post", { state: { runLog } });
    }
  };

  const onNotFeed = async () => {
    if (runLog.isFinish) {
      navigate("/feed");
    }
  };

  return (
    <>
      <RunningMap stopInterval={stopInterval} endRun={endRun}></RunningMap>
      {start && (
        <RecordHeader>
          <RunDistance>
            {runLog.distance === 0 ? 0.0 : runLog.distance}km
          </RunDistance>
          <RunTimer stopInterval={stopInterval} endRun={endRun} />
        </RecordHeader>
      )}
      <ButtonWrap>
        <div onClick={stopRun}>
          {!stopInterval ? <StopIcon /> : <StartIcon />}
        </div>
        <div onClick={onClickEnd}>
          <EndIcon />
        </div>
      </ButtonWrap>
      {showModal && (
        <Modal>
          <StartButton onClick={onStart}>
            <p>START!</p>
          </StartButton>
        </Modal>
      )}
      {endRun && (
        <Modal>
          <EndModal>
            <p>기록을 피드에 공유 하시겠습니까?</p>
            <div>
              <button onClick={onFeed}>네</button>
              <button onClick={onNotFeed}>아니오</button>
            </div>
          </EndModal>
        </Modal>
      )}
    </>
  );
};

export default Record;

const StartButton = styled.div`
  background: #333333;
  border-radius: 12px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 50px;
  p {
    font-family: "Anton";
    font-size: 46px;
    line-height: 55px;
    text-align: center;
    letter-spacing: 0.02em;
    color: #ffffff;
  }
`;

const RecordHeader = styled.div`
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 62px 32px 42px;
  position: absolute;
  width: 100%;
  top: 0px;
  background: #333333;
`;

const RunDistance = styled.div`
  font-family: "Anton";
  font-size: 48px;
  line-height: 58px;
  width: 96px;
  height: 58px;
  color: white;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 112px;
  width: 375px;
  height: 52px;
  z-index: 10;
  position: absolute;
  top: 380px;
  left: 0px;
  color: black;
`;

const EndModal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  width: 304px;
  height: 174px;
  & p {
    margin: 40px 0px;
  }
  & button {
    border: none;
    background-color: white;
    font-size: 16px;
  }
  & div {
    gap: 100px;
    display: flex;
  }
`;
