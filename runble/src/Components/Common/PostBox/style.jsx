import styled from "styled-components";
export const StyleFeed = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  padding: 2rem 0px;
  gap: 1.2rem;
  border-bottom: 1px solid #e6e6e6;
  margin: 0 auto;
`;
export const StyleFrofileBox = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
`;
export const StyleFrofile = styled.div`
  flex-direction: row;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;
export const StyleFrofileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const StyleSpeed = styled.div`
  position: absolute;
  z-index: 999;
  display: flex;
  width: 100%;
  /* padding-left: 8%; */
  top: 70%;
  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 3.6rem;
    font-family: "Tungsten";
    font-style: normal;
    font-weight: 900;
    color: #1a1a1a;
    padding: 0 5%;
  }
`;
export const StylePath = styled.div`
  width: 100%;
  height: 18rem;
`;
export const StyleContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
`;
export const StyleIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 3px 2px;
  width: 100%;
  height: 4.155rem;
`;
export const StyleHeart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0px;
  gap: 15px;
  width: 48px;
  height: 35.55px;
  justify-content: center;
`;
export const StyleView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 6px;
  width: 38px;
  height: 17px;
`;
export const StyleImg = styled.img`
  width: 34.3rem;
  height: 18rem;
  object-fit: cover;
`;

export const StyleContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  padding: 0px 2px 10px;
`;
export const StyleHashBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;
  height: 22px;
`;
export const StyleHash = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 1px 10px 4px;
  gap: 10px;
  height: 22px;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: #e6e6e6;
  border-radius: 20px;

  & > span {
    font-size: 1.2rem;
  }
`;
export const StyleGood = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 5px 2px 0px;
  gap: 10px;
  height: 22px;
  font-size: 12px;
  text-align: center;
  align-items: center;
`;
export const StyleComment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 2px 2px 5px;
  gap: 10px;
  height: 24px;
  font-size: 12px;
`;
export const StyleTime = styled.div`
  color: #999999;
  font-size: 12px;
`;
