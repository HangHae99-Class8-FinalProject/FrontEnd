import React from "react";
import { isMobile } from "react-device-detect";
import styled from "styled-components";

const Responsive = ({ children }) => {
  console.log(isMobile);
  return (
    <>
      {isMobile ? (
        <>{children}</>
      ) : (
        <NoneMobileWrap>
          <QWE>모바일에서 접속해 주세요</QWE>
          <ADS>{children}</ADS>
        </NoneMobileWrap>
      )}
    </>
  );
};

export default Responsive;

const NoneMobileWrap = styled.div`
  display: flex;
`;

const QWE = styled.div`
  display: flex;
  width: 70%;
  position: fixed;
  text-align: center;
  justify-content: center;
`;
const ADS = styled.div`
  position: absolute;
  right: 15rem;
  background-color: white;
  z-index: 10;
  max-width: 30%;
`;
