import React, { useState } from "react";
import { StyleUserWrap, StyleUsrBox, UserHeader } from "./style";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  NavState,
  PreviewImg,
  NavStates
} from "../../../Recoil/Atoms/OptionAtoms";
import { useParams, useLocation } from "react-router-dom";
import { ReactComponent as Option } from "../../../icons/option.svg";
import { ReactComponent as Profile } from "../../../icons/profile.svg";
const Userprofile = ({ userNickname }) => {
  const { nickname } = useParams();
  const [show, setShow] = useRecoilState(NavState);
  const [navState, setNavState] = useRecoilState(NavStates);
  const previewChange = useRecoilValue(PreviewImg);
  const [naveState, setNaveState] = useRecoilState(NavStates);
  const { state } = useLocation();
  console.log(state.profile);
  return (
    <StyleUserWrap>
      <UserHeader>
        {nickname === userNickname ? (
          <>
            <span>마이페이지</span>

            <Option
              onClick={() => {
                setShow(prev => !prev);
                setNaveState("option");
              }}
            ></Option>
          </>
        ) : null}
      </UserHeader>

      <StyleUsrBox>
        <div>
          {!previewChange ? (
            <img
              onClick={() => {
                setNavState("img");
                setShow(prev => !prev);
              }}
              style={{ width: "40px", height: "40px" }}
              src={state.profile}
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
    </StyleUserWrap>
  );
};
export default Userprofile;
