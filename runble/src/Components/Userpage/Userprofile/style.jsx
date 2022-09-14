import styled from "styled-components";
export const StyleUserWrap = styled.div`
  width: 100%;

  & > div {
    display: flex;
    align-items: center;
    padding: 0 3rem;
    border: 0.1rem solid black;
    box-sizing: border-box;
  }
`;
export const UserHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.6rem;
  gap: 2.6rem;
  width: 37.5rem;
  height: 4.3rem;
  background: #ffffff;
  border-bottom: 0.1rem solid #e6e6e6;
`;

export const OptionsBox = styled.div``;
export const Options = styled.img`
  width: 10rem;
  height: 5rem;
`;
