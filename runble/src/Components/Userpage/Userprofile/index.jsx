import React, { useState } from "react";
// import { StyleProfile } from "./style";
import S3upload from "react-aws-s3";
const Userprofile = () => {
  const [image, Setimage] = useState(null);
  const onChangeImg = e => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    Setimage(imageUrl);
  };
  return (
    <div>
      <div>
        <label for="input-file">
          업로드
          {!image ? (
            <img
              style={{ width: "100px", height: "100px" }}
              src="https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-%EB%82%A8%EC%84%B1%EC%9D%84%EC%9C%84%ED%95%9C-%EA%B8%B0%EB%B3%B8-%EC%95%84%EB%B0%94%ED%83%80-%ED%94%84%EB%A1%9C%ED%95%84-%EC%95%84%EC%9D%B4%EC%BD%98-%ED%9A%8C%EC%83%89-%EC%82%AC%EC%A7%84-%EC%9E%90%EB%A6%AC-%ED%91%9C%EC%8B%9C-%EC%9E%90-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%B2%A1%ED%84%B0.jpg?ver=6"
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
