import React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { NavState } from "../../../Recoil/Atoms/OptionAtoms";
import { StyleHeader, StyleFlexHeader, Logo, Option, OptionBox } from "./style";
const Header = () => {
  const [isShow, SetisShow] = useRecoilState(NavState);
  return (
    <StyleHeader>
      <StyleFlexHeader>
        <Logo>runble</Logo>
        <OptionBox
          onClick={() => {
            SetisShow(prev => !prev);
          }}
        >
          <Option
            style={{ width: "40px", height: "40px" }}
            src="/img/option.png"
          ></Option>
        </OptionBox>
      </StyleFlexHeader>
    </StyleHeader>
  );
};
export default Header;
