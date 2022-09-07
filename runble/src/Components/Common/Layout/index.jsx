import React from "react";
import Header from "../Header";
import Nav from "../Nav";
import { StyleLayout } from "./style";
import { useRecoilState } from "recoil";
import { NavState } from "../../../Recoil/Atoms/OptionAtoms";
import { useState } from "react";

const Layout = ({ children }) => {
  const [isShow, setIsShow] = useRecoilState(NavState);
  const showOutImg = () => {
    if (isShow) {
      setIsShow(false);
    }
  };
  return (
    <StyleLayout isShow={isShow} onClick={showOutImg}>
      <Header></Header>
      {children}
      <Nav></Nav>
    </StyleLayout>
  );
};
export default Layout;
