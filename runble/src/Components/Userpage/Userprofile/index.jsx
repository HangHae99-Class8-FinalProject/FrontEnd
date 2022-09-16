import React from "react";


import { StyleUserWrap, StyleUser, StyleHeader, StyleUsrBox, RankLink, UserTitle } from "./style";


import { useRecoilState } from "recoil";
import { NavState, NavStates } from "../../../Recoil/Atoms/OptionAtoms";
import { useParams } from "react-router-dom";
import { ReactComponent as Option } from "../../../Icons/option.svg";

import { ReactComponent as Profile } from "../../../Icons/MyPageProfile.svg";
import trophy from "../../../Icons/trophy.png";

const Userprofile = ({ userNickname, goalData }) => {
  const { nickname } = useParams();
  const [show, setShow] = useRecoilState(NavState);
  const [navState, setNavState] = useRecoilState(NavStates);

  const [naveState, setNaveState] = useRecoilState(NavStates);

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

              <UserTitle>
                {nickname}님의 주간 목표
                <RankLink to="/rank">
                  <img src={trophy} />
                </RankLink>
              </UserTitle>
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

              <UserTitle>
                {nickname}님의 주간 목표
                <RankLink to="/rank">
                  <img src={trophy} />
                </RankLink>
              </UserTitle>
            </StyleUsrBox>
          </>
        )}
      </StyleUser>
    </StyleUserWrap>
  );
};
export default Userprofile;
