import React, { useState } from "react";
import { StyleUserWrap, StyleUser, StyleHeader, StyleUsrBox } from "./style";
import { useRecoilState, useRecoilValue } from "recoil";
import { NavState, PreviewImg, NavStates } from "../../../Recoil/Atoms/OptionAtoms";
import { useParams, useLocation } from "react-router-dom";
import { ReactComponent as Option } from "../../../Icons/option.svg";
import { ReactComponent as Profile } from "../../../Icons/myPageProfile.svg";
const Userprofile = ({ userNickname, goalData }) => {
  const { nickname } = useParams();
  const [show, setShow] = useRecoilState(NavState);
  const [navState, setNavState] = useRecoilState(NavStates);
  const previewChange = useRecoilValue(PreviewImg);
  const [naveState, setNaveState] = useRecoilState(NavStates);
  const { state } = useLocation();

  return (
    <StyleUserWrap>
      <StyleUser>
        {nickname === userNickname ? (
          <>
            <StyleHeader>
              <div>
                <span>마이페이지</span>

                <Option
                  onClick={() => {
                    setShow(prev => !prev);
                    setNaveState("option");
                  }}
                ></Option>
              </div>
            </StyleHeader>
            <StyleUsrBox>
              <div>
                {goalData?.getUserInfo.profile ? (
                  <img
                    onClick={() => {
                      setNavState("img");
                      setShow(prev => !prev);
                    }}
                    style={{ width: "40px", height: "40px", borderRadius: "20px" }}
                    src={goalData.getUserInfo.profile}
                  ></img>
                ) : (
                  <Profile
                    onClick={() => {
                      setNavState("img");
                      setShow(prev => !prev);
                    }}
                  ></Profile>
                )}
              </div>

              <div>{nickname}님의 주간 목표</div>
            </StyleUsrBox>
          </>
        ) : (
          <>
            <StyleUsrBox>
              <div>
                {goalData?.getUserInfo.profile ? (
                  <img
                    style={{ width: "40px", height: "40px", borderRadius: "20px" }}
                    src={goalData.getUserInfo.profile}
                  ></img>
                ) : (
                  <Profile></Profile>
                )}
              </div>

              <div>{nickname}님의 주간 목표</div>
            </StyleUsrBox>
          </>
        )}
      </StyleUser>
    </StyleUserWrap>
  );
};
export default Userprofile;
