import React from "react";
import styled from "styled-components";

const Modal = ({ children }) => {
  return <ModalBackground>{children}</ModalBackground>;
};

export default Modal;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
`;
