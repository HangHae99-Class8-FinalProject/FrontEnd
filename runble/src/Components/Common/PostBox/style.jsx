import styled from "styled-components";
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
export const StyleFrofileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border: 1px solid black;
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
export const StyleImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const StyleHashBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyleHash = styled.span`
  height: 25px;
  background-color: #353434;
  color: white;
  border-radius: 10px;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;
