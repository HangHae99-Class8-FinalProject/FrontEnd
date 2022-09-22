import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { instance } from "../../../Utils/Instance";

const EventModal = () => {
  const [showEventModal, setShowEventModal] = useState(true);

  const onClickWeek = useCallback(async () => {
    setShowEventModal(false);
    const { data } = await instance.put("/api/user/research");
  }, []);

  const onClickModal = useCallback(() => {
    setShowEventModal(false);
  }, []);

  if (!showEventModal) {
    return null;
  }

  return (
    <EventModalWrap>
      <EventBox>
        <EventBody></EventBody>
        <ButtonWrap>
          <button onClick={onClickWeek}>이번주 그만보기</button>
          <button onClick={onClickModal}>&times;</button>
        </ButtonWrap>
      </EventBox>
    </EventModalWrap>
  );
};

export default EventModal;

const EventModalWrap = styled.div`
  position: absolute;
  top: 3rem;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  padding-top: 1rem;
`;

const EventBox = styled.div`
  margin: auto;
  width: 90%;
  height: 80%;
  background-color: blue;
`;

const EventBody = styled.div`
  height: 100%;
`;

const ButtonWrap = styled.div`
  background-color: #353434;
  display: flex;
  width: 100%;
  justify-content: space-between;
  & button {
    right: 2rem;
    color: white;
    border: none;
    background-color: inherit;
    font-size: 1.6rem;
  }
  & button:last-child {
    font-size: 4rem;
  }
`;
