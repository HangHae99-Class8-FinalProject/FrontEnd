import styled from "styled-components";
export const StyleNav = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  flex-direction: column;
  display: flex;
  z-index: 999;
`;
export const StyleShowBackgroud = styled.div`
  background-color: rgba(102, 100, 100, 0.3);
  height: 100vh;
  display: ${({ Show }) => (Show ? "block" : "none")};
`;

export const StyleShow = styled.div`
  width: 100%;
  height: ${({ Show }) => (Show ? "20rem" : "0rem")};
  background-color: #dbff00;
  transition: height 200ms ease-in-out;
  position: absolute;
  bottom: 0;
  right: 0;
`;
export const StyleButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: 5rem;
  text-align: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: azure;
`;

export const ModalBox = styled.div`
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
