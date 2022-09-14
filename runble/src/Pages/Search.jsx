import React, { useState, useCallback } from "react";
import styled from "styled-components";

import RelatedBar from "../Components/SearchPage/RelatedBar";
import SearchedHashTag from "../Components/SearchPage/SearchedHashTag";
import SearchedUser from "../Components/SearchPage/SearchedUser";
import useInput from "../Hooks/useInput";
import Nav from "../Components/Common/Nav";

import { ReactComponent as SearchIcon } from "../Icons/SearchIcon.svg";

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
      <SearchHead onSubmit={onSubmitSearch}>
        <SearchTerm
          type="text"
          value={searchTag}
          placeholder="검색어를 입력해주세요"
          onClick={onShowRelatedBar}
          onChange={onChangeSearchTag}
        />
        <SearchIcon onClick={onSubmitSearch} />
      </SearchHead>
      {selectedTab === "태그" && searchTag && showRelatedBar && (
        <RelatedBar
          searchTag={searchTag}
          setSearchTag={setSearchTag}
          setSearchValue={setSearchValue}
          onCloseRelatedBar={onCloseRelatedBar}
        />
      )}
      <TapWrap>
        <TapButton
          onClick={onClickUser}
          style={{ border: selectedTab === "태그" && "none" }}
        >
          유저
        </TapButton>
        <TapButton
          onClick={onClickHashTag}
          style={{ border: selectedTab === "유저" && "none" }}
        >
          태그
        </TapButton>
      </TapWrap>
      {selectedTab === "유저" && <SearchedUser searhValue={searhValue} />}
      {selectedTab === "태그" && <SearchedHashTag searhValue={searhValue} />}
      <Nav />
    </>
  );
};

export default Search;

const SearchHead = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  gap: 12px;
`;

const SearchTerm = styled.input`
  display: flex;
  padding: 8px 10px;
  width: 83%;
  height: 35px;
  background: #e6e6e6;
  border-radius: 12px;
  border: none;
`;

const TapWrap = styled.div`
  display: flex;
  width: 100vw;
  height: 37px;
`;

const TapButton = styled.button`
  width: 188px;
  border: none;
  background: #ffffff;
  border-bottom: 1px solid #333333;
`;
