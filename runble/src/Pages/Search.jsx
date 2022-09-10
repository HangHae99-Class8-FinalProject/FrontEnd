import React, { useState, useCallback } from "react";
import styled from "styled-components";

import RelatedBar from "../Components/SearchPage/RelatedBar";
import SearchedHashTag from "../Components/SearchPage/SearchedHasTag";
import SearchedUser from "../Components/SearchPage/SearchedUser";
import useInput from "../Hooks/useInput";
import Nav from "../Components/Common/Nav";

const Search = () => {
  const [searchTag, onChangeSearchTag, setSearchTag] = useInput("");
  const [searhValue, setSearchValue] = useState("");
  const [showRelatedBar, setShowRelatedBar] = useState(false);
  const [selectedTab, setSelectedTab] = useState("태그");

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

  const onSubmitSearch = useCallback(
    e => {
      e.preventDefault();
      setSearchValue(searchTag);
      setShowRelatedBar(false);
    },
    [searchTag]
  );

  return (
    <>
      <form onSubmit={onSubmitSearch}>
        <SearchTerm
          type="text"
          value={searchTag}
          placeholder="검색어를 입력해주세요"
          onClick={onShowRelatedBar}
          onChange={onChangeSearchTag}
        />
      </form>
      <CloseButton onClick={onCloseRelatedBar}>&times;</CloseButton>
      {showRelatedBar && searchTag && (
        <RelatedBar
          searchTag={searchTag}
          setSearchTag={setSearchTag}
          setSearchValue={setSearchValue}
          onCloseRelatedBar={onCloseRelatedBar}
        />
      )}
      {!showRelatedBar && (
        <TapWrap>
          <TapButton
            onClick={onClickUser}
            style={{ border: selectedTab === "유저" && "none" }}
          >
            유저
          </TapButton>
          <TapButton
            onClick={onClickHashTag}
            style={{ border: selectedTab === "태그" && "none" }}
          >
            태그
          </TapButton>
        </TapWrap>
      )}
      {selectedTab === "유저" && <SearchedUser searhValue={searhValue} />}
      {selectedTab === "태그" && <SearchedHashTag searhValue={searhValue} />}
      <Nav />
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
`;
