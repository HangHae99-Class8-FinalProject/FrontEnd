import React, { useEffect } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

import useInfinityScroll from "../../Hooks/useInfinityScroll";
import RecommentItem from "./recommentItem";
import { instance } from "../../Utils/Instance";

function Recomment({ id }) {
  const [ref, inView] = useInView();

  const getRecomment = async pageParam => {
    const response = await instance.get(`http://54.167.169.43/api/comment/recomment/${id}/${pageParam}`);
    const {Recomment, isLast} = response.data;
    console.log("확인",Recomment)
    return { Recomment, nextPage: pageParam + 1, isLast };
  };


  const {data, fetchNextPage,isFetchingNextPage,lastPage} = useInfinityScroll("GET_RECOMMENT", getRecomment);


  useEffect(() => {
    if (inView && !lastPage) fetchNextPage();
  }, [inView,lastPage]);

  return (
    <ReplyBox>
      {data?.pages.map((page, i) => {
        console.log("page:", page);
        return (
          <React.Fragment key={i}>
            {page?.Recomment.map(reply => {
              console.log("reply:", reply);
              return (
                <Content key={reply.recommentId}>
                  <RecommentItem data={reply} />
                </Content>
              );
            })}
          </React.Fragment>
        );
      })}
        {isFetchingNextPage ? <></> : <div ref={ref}></div>}
    </ReplyBox>
  );
}

export default Recomment;

const ReplyBox = styled.div`
  width: 100%;
`;

const Content = styled.div`
`;
