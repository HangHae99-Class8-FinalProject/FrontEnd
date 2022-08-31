import styled from "styled-components";
export const StyleNav = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  flex-direction: column;
  display: flex;
`;
export const StyleShowBackgroud = styled.div`
  background-color: rgba(102, 100, 100, 0.3);
  height: 100vh;
  display: ${({ Show }) => (Show ? "block" : "none")};
`;

export const StyleShow = styled.div`
  width: 100%;
  height: ${({ Show }) => (Show ? "200px" : "0px")};
  background-color: #dbff00;
  transition: height 200ms ease-in-out;
  position: absolute;
  bottom: 0;
  right: 0;
`;
export const StyleButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 50px;
  text-align: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: azure;
`;
