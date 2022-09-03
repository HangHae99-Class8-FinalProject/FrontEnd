import React from "react";
import { useRecoilState } from "recoil";
import { NavState, NavStates } from "../../../Recoil/Atoms/OptionAtoms";
import {
  StyleFeed,
  StyleFrofileBox,
  StyleFrofile,
  StylePath,
  StyleRecord
} from "./style";
const MainList = ({ post }) => {
  console.log(post);
  const [Show, SetShow] = useRecoilState(NavState);
  const [naveState, SetnaveState] = useRecoilState(NavStates);
  return (
    <>
      {post?.map((list, idx) => {
        return (
          <StyleFeed key={idx}>
            <div>
              <StyleFrofileBox>
                <StyleFrofile>
                  <div>프로필사진</div>
                  <span>닉네임</span>
                </StyleFrofile>
                <div style={{ display: "flex" }}>
                  <span>조회수:1</span>
                  <div
                    onClick={() => {
                      SetShow(prev => !prev);
                      SetnaveState("put");
                    }}
                  >
                    ...
                  </div>
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
    </>
  );
};
export default MainList;
