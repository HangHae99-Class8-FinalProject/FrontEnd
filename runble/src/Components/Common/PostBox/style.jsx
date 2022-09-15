import styled from "styled-components";
export const StyleFeed = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  border: 0.1rem solid black;
  margin-bottom: 5rem;
  & > div {
    padding: 1rem;
  }
`;
export const StyleFrofileBox = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
`;
export const StyleFrofileImg = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 4rem;
  border: 0.1rem solid black;
`;
export const StyleFrofile = styled.div`
  flex-direction: row;
  display: flex;
`;
export const StyleRecord = styled.div`
  display: flex;
`;
export const StylePath = styled.div`
  height: 20rem;
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

export const StyleHash = styled.div`
  width: 100%;
  height: 2.5rem;
  background-color: #353434;
  color: white;
  border-radius: 1rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  & > span {
    font-size: 1.2rem;
  }
`;
