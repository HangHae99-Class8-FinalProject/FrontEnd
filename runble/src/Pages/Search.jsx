import React, { useState, useCallback } from "react";
import styled from "styled-components";

import RelatedBar from "../Components/SearchPage/RelatedBar";
import { debounce } from "../Utils/debounce";
import SearchedHashTag from "../Components/SearchPage/SearchedHasTag";
import SearchedUser from "../Components/SearchPage/SearchedUser";

const Search = () => {
  const [searchTag, setSearchTag] = useState("");
  const [showRelatedBar, setShowRelatedBar] = useState(false);
  const [selectedTab, setSelectedTab] = useState("유저");

  const onShowRelatedBar = useCallback(() => {
    setShowRelatedBar(true);
  }, []);

  const onCloseRelatedBar = useCallback(() => {
    setShowRelatedBar(false);
  }, []);

  const onClickUser = useCallback(() => {
    setSelectedTab("유저");
  }, []);

  const onClickHashTag = useCallback(() => {
    setSelectedTab("태그");
  }, []);

  const onChangeSearchTag = useCallback(
    e => {
      debounce(setSearchTag(e.target.value), 1000);
    },
    [searchTag]
  );

  return (
    <>
      <SearchTerm
        type="text"
        value={searchTag}
        placeholder="검색어를 입력해주세요"
        onClick={onShowRelatedBar}
        onChange={onChangeSearchTag}
      />
      <CloseButton onClick={onCloseRelatedBar}>&times;</CloseButton>
      {showRelatedBar && searchTag && <RelatedBar searchTag={searchTag} />}
      {!showRelatedBar && (
        <TapWrap>
          <TapButton onClick={onClickUser}>유저</TapButton>
          <TapButton onClick={onClickHashTag}>태그</TapButton>
        </TapWrap>
      )}
      {selectedTab === "유저" && <SearchedUser />}
      {selectedTab === "태그" && <SearchedHashTag />}
    </>
  );
};

export default Search;

const SearchTerm = styled.input`
  width: 345px;
  height: 61px;
  background: #353434;
  font-size: 16px;
  color: white;
  padding: 0 15px;
  line-height: 18px;
  font-weight: 400;
`;

const CloseButton = styled.div`
  position: absolute;
  display: flex;
  width: 40px;
  height: 40px;
  left: 326px;
  top: 11px;
  background: #353434;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  color: white;
`;

const TapWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const TapButton = styled.button`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 4px solid #353434;
  &:focus {
    font-weight: bold;
  }
`;
