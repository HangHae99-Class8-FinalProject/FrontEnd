import React from "react";
import { StyleNav, StyleShow, StyleButton, StyleShowBackgroud } from "./style";
import { useRecoilValue } from "recoil";
import { NavState, ChangeImgState } from "../../../Recoil/Atoms/OptionAtoms";
import { useState } from "react";
const Nav = () => {
  const Show = useRecoilValue(NavState);
  const ChangeImg = useRecoilValue(ChangeImgState);
  const UserProfileConfirm = () => {
    if (!ChangeImg) {
      alert("이미지등록해주세요");
    } else if (confirm("프로필을 변경하시겠습니까")) {
      window.alert("이미지변경완료!");
    } else {
      return;
    }
  };
  const logoutConfirm = () => {
    if (confirm("로그아웃하시겠습니까")) {
      return;
    } else {
      return;
    }
  };
  const outConfirm = () => {
    if (confirm("회원탈퇴하시겠습니까")) {
      return;
    } else {
      return;
    }
  };
  return (
    <>
      <StyleNav>
        <StyleShowBackgroud Show={Show}></StyleShowBackgroud>
        <StyleShow Show={Show}>
          <p
            onClick={() => {
              UserProfileConfirm();
            }}
          >
            프로필 이미지 수정
          </p>
          <p
            onClick={() => {
              logoutConfirm();
            }}
          >
            로그아웃
          </p>
          <p
            onClick={() => {
              outConfirm();
            }}
          >
            회원탈퇴
          </p>
          <p>약관보기</p>
        </StyleShow>
        <StyleButton>
          <div>게시글</div>
          <div>검색</div>
          <div>기록하기</div>
          <div>마이페이지</div>
        </StyleButton>
      </StyleNav>
    </>
  );
};

export default Nav;
