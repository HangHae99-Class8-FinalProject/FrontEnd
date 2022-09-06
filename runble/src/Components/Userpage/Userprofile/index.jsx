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
  const [Show, SetShow] = useRecoilState(NavState);
  const [navState, SetnavState] = useRecoilState(NavStates);
  const previewChange = useRecoilValue(PreviewImg);

  return (
    <StyleUserWrap>
      <div>
        {!previewChange ? (
          <img
            onClick={() => {
              SetnavState("img");
              SetShow(prev => !prev);
            }}
            style={{ width: "80px", height: "80px" }}
            src="/img/userprofile.png"
          ></img>
        ) : (
          <img
            onClick={() => {
              SetnavState("img");
              SetShow(prev => !prev);
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
