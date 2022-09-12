import styled from "styled-components";
export const StyleUserWrap = styled.div`
  width: 100%;

  & > div {
    display: flex;
    align-items: center;
    padding: 0 30px;
    border: 1px solid black;
    box-sizing: border-box;
  }
`;
export const UserHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  gap: 26px;
  width: 375px;
  height: 43px;
  background: #ffffff;
  border-bottom: 1px solid #e6e6e6;
`;

export const OptionsBox = styled.div``;
export const Options = styled.img`
  width: 100px;
  height: 50px;
`;
