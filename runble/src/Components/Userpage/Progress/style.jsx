import styled from "styled-components";
export const StyleWrap = styled.div`
  width: 100%;
`;
export const StyleGoal = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 3rem;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
  }
`;
export const StyleProgress = styled.div`
  height: 30rem;
  background-color: aliceblue;
  border: 0.1rem solid black;
  box-sizing: border-box;
  margin-top: 5rem;
  margin: 1rem 3rem;
  & > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;
export const StyleProgressBox = styled.div`
  height: 10rem;
  display: block;
`;
