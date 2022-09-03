import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { StyleFeedWrap } from "./style";
import LikeList from "../LikeList/index";
import MainList from "../MainList/index";
import { NavState, NavStates } from "../../../Recoil/Atoms/OptionAtoms";
import { useRecoilState } from "recoil";
import { usePost, uselankingList } from "../../../Hooks/useinfiny";
import { useState } from "react";

const UserfeedList = () => {
  const [page, setPage] = useState(1);

  const {
    data: post,
    error,
    isError,
    isLoading,
    refetch: main
  } = usePost(page); //최신순
  const { refetch: fetch, data: like } = uselankingList(); //인기순
  console.log(post);
  let [data, setData] = useState([]);
  const [filter, SetFilter] = useState(false);

  const { state } = useLocation();
  const [Show, SetShow] = useRecoilState(NavState);
  const [naveState, SetnaveState] = useRecoilState(NavStates);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight
      ) {
        if (!isLoading && !post.isLast) {
          setPage(prev => prev + 1);

          console.log(
            window.scrollY,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight
          );
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isLoading]);
  return (
    <StyleFeedWrap>
      {state ? (
        <div>
          <span
            onClick={() => {
              main();
              SetFilter(false);
            }}
          >
            최신
          </span>{" "}
          /{" "}
          <span
            onClick={() => {
              fetch();
              SetFilter(true);
            }}
          >
            인기
          </span>
        </div>
      ) : null}
      {filter ? (
        <LikeList like={like}></LikeList>
      ) : (
        <MainList post={post}></MainList>
      )}
    </StyleFeedWrap>
  );
};
export default UserfeedList;
