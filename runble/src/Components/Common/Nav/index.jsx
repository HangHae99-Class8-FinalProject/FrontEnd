import React, { useRef, useState } from "react";

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
  PreviewImg,
  NavStates
} from "../../../Recoil/Atoms/OptionAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMutation, useQueryClient } from "react-query";
import S3upload from "react-aws-s3";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import imageCompression from "browser-image-compression";
window.Buffer = window.Buffer || require("buffer").Buffer;
const Nav = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [Show, SetShow] = useRecoilState(NavState);
  const [preview, SetPreview] = useRecoilState(PreviewImg);
  const [naveState, SetnaveState] = useRecoilState(NavStates);
  const navEvent = useRecoilValue(NavStates);
  const imgVal = useRef(null);
  const [submit, Setsubmit] = useState({
    profile: ""
  });
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };

  const { mutate, isLoading, error, isSuccess } = useMutation(submit => {
    return axios.post("http://localhost:3001/profile", submit);
  });

  const submitImg = async () => {
    let file = imgVal.current.files[0];
    let newFileName = imgVal.current.files[0].name;
    const compressedFile = await imageCompression(file, options);
    console.log(compressedFile.size / 1024 / 1024);

    const config = {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION
    };
    const ReactS3Client = new S3upload(config);
    ReactS3Client.uploadFile(compressedFile, newFileName).then(async data => {
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

        {
          {
            option: (
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
            ),
            img: (
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
            ),
            put: (
              <StyleShow Show={Show}>
                <p>수정하기</p>
                <p>삭제하기</p>
              </StyleShow>
            )
          }[navEvent]
        }

        <StyleButton>
          <div
            onClick={() => {
              navigate("/feed", { state: true });
            }}
          >
            게시글
          </div>
          <div
            onClick={() => {
              navigate("/search");
            }}
          >
            검색
          </div>
          <div
            onClick={() => {
              navigate("/record");
            }}
          >
            기록하기
          </div>
          {state ? (
            <div
              onClick={() => {
                navigate("/user");
              }}
            >
              마이페이지
            </div>
          ) : (
            <OptionsBox
              onClick={() => {
                SetShow(prev => !prev);
                SetnaveState("option");
              }}
            >
              <Options
                style={{ width: "40px", height: "40px" }}
                src="/img/option.png"
              ></Options>
            </OptionsBox>
          )}
        </StyleButton>
      </StyleNav>
    </>
  );
};

export default Nav;
