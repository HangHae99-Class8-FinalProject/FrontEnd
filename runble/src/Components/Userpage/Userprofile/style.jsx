import styled from "styled-components";
export const StyleUserWrap = styled.div`
  width: 100%;
  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 20px 16px;
  }
`;
export const UserHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  gap: 26px;
  width: 37.5rem;
  height: 43px;
  background: #ffffff;
  border-bottom: 0.1rem solid #e6e6e6;
`;
export const StyleUsrBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 10px;
`;
