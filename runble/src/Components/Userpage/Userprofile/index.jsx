import React, { useState } from "react";
import { StyleUserWrap, OptionsBox, Options, UserHeader } from "./style";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  NavState,
  PreviewImg,
  NavStates
} from "../../../Recoil/Atoms/OptionAtoms";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
const Userprofile = ({ userNickname }) => {
  const { nickname } = useParams();
  const { state } = useLocation();
  const [show, setShow] = useRecoilState(NavState);
  const [navState, setNavState] = useRecoilState(NavStates);
  const previewChange = useRecoilValue(PreviewImg);
  const [naveState, setNaveState] = useRecoilState(NavStates);
  return (
    <StyleUserWrap>
      <UserHeader>
        {nickname === userNickname ? (
          <>
            <span>마이페이지</span>
            <OptionsBox
              onClick={() => {
                setShow(prev => !prev);
                setNaveState("option");
              }}
            >
              <Options
                style={{ width: "40px", height: "40px" }}
                src="/img/option.png"
              ></Options>
            </OptionsBox>
          </>
        ) : null}
      </UserHeader>

      <div>
        {!previewChange ? (
          <img
            onClick={() => {
              setNavState("img");
              setShow(prev => !prev);
            }}
            style={{ width: "80px", height: "80px" }}
            src="/img/userprofile.png"
          ></img>
        ) : (
          <img
            onClick={() => {
              setNavState("img");
              setShow(prev => !prev);
            }}
            style={{ width: "80px", height: "80px" }}
            src={previewChange}
          ></img>
        )}

        <div>{nickname}</div>
      </div>
    </StyleUserWrap>
  );
};
export default Userprofile;
