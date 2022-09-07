import styled from "styled-components";
export const StyleWrap = styled.div`
  width: 100%;
`;
export const StyleGoal = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 30px;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
  }
`;
export const StyleProgress = styled.div`
  height: 300px;
  background-color: aliceblue;
  border: 1px solid black;
  box-sizing: border-box;
  margin-top: 50px;
  margin: 10px 30px;
  & > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;
export const StyleProgressBox = styled.div`
  height: 100px;
  display: block;
`;
