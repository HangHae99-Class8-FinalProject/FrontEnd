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
import { ReactComponent as StartIcon } from "../Icons/StartIcon.svg";

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
  });

  let hour = runLog.time.hour * 60 * 60;
  let minute = runLog.time.minute * 60;
  let second = runLog.time.second;

  let totalTime = hour + minute + second;
  console.log(totalTime);

  const onFeed = async () => {
    if (runLog.isFinish) {
      const { data } = await instance.post("/api/user/distance", {
        distance: runLog.distance,
        time: totalTime
      });
      navigate("/post", { state: { runLog } });
    }
  };

  const onNotFeed = async () => {
    if (runLog.isFinish) {
      const { data } = await instance.post("/api/user/distance", {
        distance: runLog.distance,
        time: totalTime
      });
      navigate("/feed");
    }
  };

  return (
    <>
      <RunningMap stopInterval={stopInterval} endRun={endRun}></RunningMap>
      {start && (
        <RecordHeader>
          <HeaderWrap>
            <RunDistance>{runLog.distance === 0 ? 0.0 : runLog.distance}km</RunDistance>
            <RunTimer stopInterval={stopInterval} endRun={endRun} />
          </HeaderWrap>
        </RecordHeader>
      )}
      <ButtonWrap>
        <div onClick={stopRun}>{!stopInterval ? <StopIcon /> : <StartIcon />}</div>
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
  border-radius: 1.2rem;
  height: 7.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 5rem;
  p {
    font-family: "Anton";
    font-size: 4.6rem;
    line-height: 5.5rem;
    text-align: center;
    letter-spacing: 0.02em;
    color: #ffffff;
  }
`;

const HeaderWrap = styled.div`
  width: 82%;
  display: flex;
  justify-content: space-between;
`;

const RecordHeader = styled.div`
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 6.2rem 3.2rem 4.2rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #333333;
`;

const RunDistance = styled.div`
  font-family: "Anton";
  font-size: 4.8rem;
  line-height: 5.8rem;
  width: 9.6rem;
  height: 5.8rem;
  color: white;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12rem;
  width: 100%;
  height: 5.2rem;
  z-index: 10;
  position: absolute;
  top: 38rem;
`;

const EndModal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 1rem;
  justify-content: center;
  align-items: center;
  width: 30.4rem;
  height: 17.4rem;
  & p {
    margin: 4rem 0rem;
  }
  & button {
    border: none;
    background-color: white;
    font-size: 1.6rem;
  }
  & div {
    gap: 10rem;
    display: flex;
  }
`;
