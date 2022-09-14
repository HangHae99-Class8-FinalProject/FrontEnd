import styled from "styled-components";
export const StyleWrap = styled.div`
  width: 100%;
  & > div {
    padding: 2.4rem 1.6rem 2rem;
  }
`;
export const StyleProgress = styled.div`
  width: 95%;
  height: 23rem;
  background-color: rgba(53, 52, 52, 1);
  box-sizing: border-box;
  border-radius: 12px;
  margin: 0 auto;
  & > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;
export const StyleProgressBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;
export const StyleProgressGoalData = styled.div`
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 28px;
`;
export const StyleNextProgress = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 100%;
  height: 230px;
  background: #353434;
  border-radius: 12px;
`;
export const StyleSevenProgress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 230px;
`;
export const StyleSevenTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 47px;
  width: 332px;

  /* background-color: darkblue; */
`;
export const StyleSevenGoal = styled.span`
  padding: 12px 14px;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  color: #ffffff;
`;
export const StyleGoalDate = styled.span`
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  padding: 12px 14px;

  color: #ffffff;
`;
export const StyleSevenDate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 14px;
  width: 95%;
  height: 85px;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 5px;
    color: #ffffff;
    width: 34px;
    height: 57px;
    & > span:first-child {
      font-size: 10px;
    }
    & > span:nth-child(2) {
      font-size: 16px;
    }
    & > span:last-child {
      font-size: 10px;
    }
  }
`;
export const StyleDistanceBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 22px;
  /* background-color: aliceblue; */
  width: 344px;
  height: 96px;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    /* padding: 0px 78px 18px; */
    padding: 0 40px;
    & > span:first-child {
      font-size: 36px;
    }
    & > span:nth-child(2) {
      font-size: 12px;
    }
  }
`;
