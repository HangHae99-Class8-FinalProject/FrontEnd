import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import {
  StyleFeed,
  StyleFrofileBox,
  StyleFrofile,
  StylePath,
  StyleFeedWrap,
  StyleRecord
} from "./style";
import { NavState, NavStates } from "../../Recoil/Atoms/OptionAtoms";
import { useRecoilState } from "recoil";
import { usePost } from "../../Hooks/useinfiny";
const Userfeed = () => {
  const { data, error, isError, isLoading } = usePost();

  const { state } = useLocation();
  const [Show, SetShow] = useRecoilState(NavState);
  const [naveState, SetnaveState] = useRecoilState(NavStates);
  useEffect(() => {
    const onScroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (!isLoading) {
          return;
        }
      }
    };
    console.log(
      window.scrollY,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isLoading]);
  return (
    <StyleFeedWrap>
      {state ? (
        <div>
          <span>최신</span> / <span>인기</span>
        </div>
      ) : null}
      {data?.map((list, idx) => {
        return (
          <StyleFeed key={idx}>
            <div>
              <StyleFrofileBox>
                <StyleFrofile>
                  <div>프로필사진</div>
                  <span>닉네임</span>
                </StyleFrofile>
                <div
                  onClick={() => {
                    SetShow(prev => !prev);
                    SetnaveState("put");
                  }}
                >
                  ...
                </div>
              </StyleFrofileBox>
              <StyleRecord>
                <div>거리:4km</div>
                <div>시간:30분</div>
              </StyleRecord>
              <StylePath>거리사진</StylePath>
              <div>
                <p>컨텐트</p>
                <p>#달리기</p>
                <p>좋아요1개</p>
                <p>댓글1개모두보기</p>
              </div>
            </div>
          </StyleFeed>
        );
      })}
    </StyleFeedWrap>
  );
};
export default Userfeed;
