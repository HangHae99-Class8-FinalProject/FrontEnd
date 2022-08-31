import React, { useState } from "react";
// import { StyleProfile } from "./style";
import { useRecoilState } from "recoil";
import { ChangeImgState } from "../../../Recoil/Atoms/OptionAtoms";
import S3upload from "react-aws-s3";
const Userprofile = () => {
  const [image, Setimage] = useState(null);
  const [changeimage, SetChageimage] = useRecoilState(ChangeImgState);
  const onChangeImg = e => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    Setimage(imageUrl);
    SetChageimage(true);
  };
  return (
    <div>
      <div>
        <label htmlFor="input-file">
          업로드
          {!image ? (
            <img
              style={{ width: "80px", height: "80px" }}
              src="/img/userprofile.png"
            ></img>
          ) : (
            <img style={{ width: "100px", height: "100px" }} src={image}></img>
          )}
        </label>
        <input
          style={{ display: "none" }}
          onChange={onChangeImg}
          id="input-file"
          type="file"
          accept="image/*"
        ></input>
        <div>런닝 못참지</div>
      </div>
    </div>
  );
};
export default Userprofile;
