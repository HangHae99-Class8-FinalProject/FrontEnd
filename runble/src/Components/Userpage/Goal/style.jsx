import styled from "styled-components";
export const StyleGoal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 16px;
  gap: 10px;
  width: 343px;
  height: 230px;
  background: #353434;
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  & > div {
    font-size: 12px;
    color: #ffffff;
  }
`;
export const StyleGoalButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 37px;
  background-color: #ffffff;
  border-radius: 25px;
  padding: 6px 20px 8px;
  gap: 10px;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const StyleModal = styled.div`
  width: 304px;
  height: 174px;
  position: fixed;
  margin: -200px 35px;
  background-color: rgba(0, 0, 0, 0.65);
  color: #ffffff;
  border-radius: 15px;
  & > div {
    padding: 25px;
    align-items: center;
    justify-content: center;
    text-align: center;
    & > label {
      width: 100%;
    }
  }
`;
export const StyleInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: 0;
  margin: 20px 0;
`;
export const StyleButton = styled.div`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`;
