import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { instance } from "../../../Utils/Instance";
import PostBox from "../../Common/PostBox";
import Nav from "../../Common/Nav/index";

const SearchedHashTag = ({ searhValue }) => {
  const [ref, inView] = useInView();
  const [tap, setTap] = useState("최신");

  const { state } = useLocation();
  console.log(state);

  if (state) {
    searhValue = state;
  }

  const getSearchHashTagOrder = async pageParam => {
    const { data } = await instance.get(`/api/post/search/popular/${pageParam}?hashtag=${searhValue}`);
    return data;
  };

  const getSearchHashTagNewest = async pageParam => {
    const { data } = await instance.get(`/api/post/search/new/${pageParam}?hashtag=${searhValue}`);
    return data;
  };

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["searchHashtag", searhValue],
    ({ pageParam = 1 }) => (tap === "인기" ? getSearchHashTagOrder(pageParam) : getSearchHashTagNewest(pageParam)),
    {
      enabled: !!searhValue,
      getNextPageParam: lastPage => (!lastPage.isLast ? lastPage.nextPage : undefined)
    }
  );

  console.log(tap);

  useEffect(() => {
    if (inView && searhValue) fetchNextPage();
  }, [inView, searhValue]);

  console.log("result:", data);

  return (
    <Body>
      <ButtonWrap>
        <button
          onClick={() => {
            setTap("최신");
          }}
        >
          <span style={{ fontWeight: tap === "최신" ? "bold" : "normal" }}>최신</span>
        </button>
        <button
          onClick={() => {
            setTap("인기");
          }}
        >
          <span style={{ fontWeight: tap === "인기" ? "bold" : "normal" }}>인기</span>
        </button>
      </ButtonWrap>
      <div>
        {data?.pages.map((page, index) => (
          <div key={index}>
            {page?.Post.map((posts, index) => (
              <PostBox key={index} posts={posts} index={index}></PostBox>
            ))}
          </div>
        ))}
      </div>
      {isFetchingNextPage ? <span></span> : <div ref={ref}></div>}
      <Nav />
    </Body>
  );
};

export default SearchedHashTag;

const Body = styled.div`
  margin-bottom: 7rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 2.4rem 1.6rem 0rem;

  width: 34.3rem;
  height: 1.7rem;
  & button {
    border: none;
    background-color: white;
  }
`;
