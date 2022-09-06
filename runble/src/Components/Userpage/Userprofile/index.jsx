import React, { useState } from "react";
import { StyleUserWrap } from "./style";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  NavState,
  PreviewImg,
  NavStates
} from "../../../Recoil/Atoms/OptionAtoms";
import { useQuery } from "react-query";
import axios from "axios";

const Userprofile = () => {
  const [show, setShow] = useRecoilState(NavState);
  const [navState, setNavState] = useRecoilState(NavStates);
  const previewChange = useRecoilValue(PreviewImg);

  return (
    <StyleUserWrap>
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

        <div>런닝 못참지</div>
      </div>
    </StyleUserWrap>
  );
};
export default Userprofile;
