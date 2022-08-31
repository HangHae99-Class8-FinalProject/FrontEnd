import React, { useRef } from "react";

import {
  StyleNav,
  StyleShow,
  StyleButton,
  StyleShowBackgroud,
  Options,
  OptionsBox
} from "./style";

import {
  NavState,
  ImgState,
  PreviewImg
} from "../../../Recoil/Atoms/OptionAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMutation } from "react-query";
import S3upload from "react-aws-s3";
import axios from "axios";
import { useState } from "react";
window.Buffer = window.Buffer || require("buffer").Buffer;
const Nav = () => {
  const [Show, SetShow] = useRecoilState(NavState);
  const [profile, Setprofile] = useRecoilState(ImgState);
  const [preview, SetPreview] = useRecoilState(PreviewImg);
  const profileImg = useRecoilValue(ImgState);
  const imgVal = useRef(null);
  const [submit, Setsubmit] = useState({
    profile: ""
  });

  const { mutate, isLoading, error, isSuccess } = useMutation(submit => {
    return axios.post("http://localhost:3001/posts", submit);
  });

  const submitImg = () => {
    let file = imgVal.current.files[0];
    let newFileName = imgVal.current.files[0].name;

    const config = {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION
    };
    const ReactS3Client = new S3upload(config);
    ReactS3Client.uploadFile(file, newFileName).then(async data => {
      if (data.status === 204) {
        let imgUrl = data.location;
        const newimg = { ...submit, profile: imgUrl };
        mutate(newimg);
      } else {
        window.alert("사진 업로드에 오류가 있어요! 관리자에게 문의해주세요.");
      }
    });
  };
  const onChangeImg = e => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    SetPreview(imageUrl);
    submitImg();
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
        {profileImg ? (
          <StyleShow Show={Show}>
            <p
              onClick={() => {
                SetPreview(`/img/userprofile.png`);
              }}
            >
              기본이미지로변경하기
            </p>
            <div>
              <label htmlFor="inputFile">앨범에서 사진선택하기</label>
              <input
                style={{ display: "none" }}
                onChange={onChangeImg}
                id="inputFile"
                type="file"
                accept="image/*"
                ref={imgVal}
              ></input>
            </div>
          </StyleShow>
        ) : (
          <StyleShow Show={Show}>
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
        )}

        <StyleButton>
          <div>게시글</div>
          <div>검색</div>
          <div>기록하기</div>
          <OptionsBox
            onClick={() => {
              SetShow(prev => !prev);
              Setprofile(false);
            }}
          >
            <Options
              style={{ width: "40px", height: "40px" }}
              src="/img/option.png"
            ></Options>
          </OptionsBox>

          {/* <div>마이페이지</div> */}
        </StyleButton>
      </StyleNav>
    </>
  );
};

export default Nav;
