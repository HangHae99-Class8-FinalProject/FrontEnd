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
  background-color: rgba(26, 26, 26, 0.5);
  height: 100vh;
  display: ${({ Show }) => (Show ? "block" : "none")};
`;

export const StyleShow = styled.div`
  width: 100%;
  height: ${({ Show }) => (Show ? "17rem" : "0px")};
  background-color: #ffffff;
  transition: height 200ms ease-in-out;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  & > p {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 16px;
    text-align: center;
  }
  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 16px;
  }
`;
export const StyleButton = styled.div`
  width: 100%;
  min-width: 3.75em;
  height: 7.4rem;
  display: flex;
  /* justify-content: space-around; */
  flex: none;
  order: 1;
  flex-grow: 0;
  /* text-align: center; */
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: #353434;
  & > div {
    width: 100vw;
    /* min-width: 2.8rem; */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    flex: 1;
    /* justify-content: center; */
    padding: 0px;
    margin-bottom: 1.2rem;
    & > div {
      flex-shrink: 1;
    }
  }
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
