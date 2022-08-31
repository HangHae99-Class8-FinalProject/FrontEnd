import React, { useState } from "react";
// import { StyleProfile } from "./style";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ImgState,
  NavState,
  PreviewImg
} from "../../../Recoil/Atoms/OptionAtoms";
import { useQuery } from "react-query";
import axios from "axios";

const Userprofile = () => {
  // const { data, isLoading, error } = useQuery(["profile"], () =>
  //   axios.get(`http://localhost:3001/posts`)
  // );

  const [Show, SetShow] = useRecoilState(NavState);
  const [profile, Setprofile] = useRecoilState(ImgState);
  const previewChange = useRecoilValue(PreviewImg);

  return (
    <div>
      <div>
        {!previewChange ? (
          <img
            onClick={() => {
              Setprofile(true);
              SetShow(prev => !prev);
            }}
            style={{ width: "80px", height: "80px" }}
            src="/img/userprofile.png"
          ></img>
        ) : (
          <img
            onClick={() => {
              Setprofile(true);
              SetShow(prev => !prev);
            }}
            style={{ width: "80px", height: "80px" }}
            src={previewChange}
          ></img>
        )}

        <div>런닝 못참지</div>
      </div>
    </div>
  );
};
export default Userprofile;
