import styled from "styled-components";
import { ReactComponent as Home } from "../../../icons/home.svg";
import { ReactComponent as Search } from "../../../icons/search.svg";
import { ReactComponent as Run } from "../../../icons/run.svg";
import { ReactComponent as Mypage } from "../../../icons/mypage.svg";
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
  height: ${({ Show }) => (Show ? "160px" : "0px")};
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
  height: 74px;
  display: flex;
  justify-content: space-around;
  flex: none;
  order: 1;
  flex-grow: 0;
  text-align: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: #353434;
  & > div {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 69px;
    & > div {
      flex: none;
      order: 0;
      flex-grow: 0;
    }
  }
`;
