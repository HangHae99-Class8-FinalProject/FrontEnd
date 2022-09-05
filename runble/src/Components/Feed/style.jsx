import styled from "styled-components";
export const StyleFeedWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
  & > div {
    float: right;
  }
`;
export const StyleFeed = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  border: 1px solid black;
  margin-bottom: 50px;
  & > div {
    padding: 10px;
  }
`;
export const StyleFrofileBox = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
`;
export const StyleFrofile = styled.div`
  flex-direction: row;
  display: flex;
`;
export const StyleRecord = styled.div`
  display: flex;
`;
export const StylePath = styled.div`
  height: 200px;
  background-color: azure;
`;
