import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { StyleFeedWrap, StyleFilter } from "./style";
import LikeList from "../LikeList/index";
import MainList from "../MainList/index";
import { useState } from "react";
const UserfeedList = () => {
  const [filter, SetFilter] = useState(false);
  const { state } = useLocation();
  return (
    <StyleFeedWrap>
      {state ? (
        <StyleFilter>
          <span
            onClick={() => {
              SetFilter(false);
            }}
          >
            최신
          </span>
          /
          <span
            onClick={() => {
              SetFilter(true);
            }}
          >
            인기
          </span>
        </StyleFilter>
      ) : null}
      {filter ? <LikeList></LikeList> : <MainList></MainList>}
    </StyleFeedWrap>
  );
};
export default UserfeedList;
