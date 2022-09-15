import styled from "styled-components";
export const StyleFeedWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 2.4rem 1.6rem 2rem;
  align-items: flex-start;
  flex-direction: column;
`;
export const StyleFilter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  height: 23px;
  & > p {
    font-size: 16px;
    font-weight: 400;
  }
  & > div {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 4px;
    & > span {
      font-size: 12px;
    }
  }
`;
export const StyleNewSpan = styled.span`
  color: ${({ Filter }) => (Filter ? "#999999" : "#000000")};
`;
export const StyleLikeSpan = styled.span`
  color: ${({ Filter }) => (Filter ? "#000000" : "#999999")};
`;
