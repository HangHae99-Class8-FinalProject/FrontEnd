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
    return response.data;
  };

  const [data, fetchNextPage] = useInfinityScroll(["GET_RECOMMENT", id], getRecomment);
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

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
    </ReplyBox>
  );
}

export default Recomment;

const ReplyBox = styled.div`
  width: 100%;
`;

const Content = styled.div`
  margin-left: 4rem;
  margin-bottom: 1rem;
`;
