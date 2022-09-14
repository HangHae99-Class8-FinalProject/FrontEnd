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
  NavStates,
  NavPostData
} from "../../../Recoil/Atoms/OptionAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMutation, useQueryClient } from "react-query";
import S3upload from "react-aws-s3";
import { instance } from "../../../Utils/Instance";
import { useNavigate, useLocation } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { useDeletePost } from "../../../Hooks/useDeletePost";
import { S3config } from "../../../Utils/S3Config";

window.Buffer = window.Buffer || require("buffer").Buffer;
const Nav = ({ feed }) => {
  const { mutate } = useDeletePost();
  const navigate = useNavigate();
  const [show, setShow] = useRecoilState(NavState);
  const [preview, setPreview] = useRecoilState(PreviewImg);
  const navEvent = useRecoilValue(NavStates);
  const postData = useRecoilValue(NavPostData);
  const imgVal = useRef(null);
  const [submit, setSubmit] = useState({
    profile: ""
  });
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };

  // const { mutate, isLoading, error, isSuccess } = useMutation(submit => {
  //   return axios.post("http://localhost:3001/profile", submit);
  // });
  const accessToken = localStorage.getItem("userData");
  const parseData = JSON.parse(accessToken);
  const nickname = parseData.nickname;
  const submitImg = async () => {
    let file = imgVal.current.files[0];
    let newFileName = imgVal.current.files[0].name;
    const compressedFile = await imageCompression(file, options);
    console.log(compressedFile.size / 1024 / 1024);

    const ReactS3Client = new S3upload(S3config);
    ReactS3Client.uploadFile(compressedFile, newFileName).then(async data => {
      if (data.status === 204) {
        let imgUrl = data.location;
        const newimg = { ...submit, profile: imgUrl };
        // mutate(newimg);
      } else {
        window.alert("사진 업로드에 오류가 있어요! 관리자에게 문의해주세요.");
      }
    });
  };
  const onChangeImg = e => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setPreview(imageUrl);
    submitImg();
  };

  const logoutConfirm = () => {
    if (confirm("로그아웃하시겠습니까")) {
      return localStorage.clear(), navigate("/");
    } else {
      return;
    }
  };

  const outConfirm = () => {
    if (confirm("회원탈퇴하시겠습니까")) {
      return (
        instance.delete("http://54.167.169.43/api/user"),
        alert("회원탈퇴되었습니다"),
        navigate("/")
      );
    } else {
      return;
    }
  };
  const DeleteConfirm = () => {
    if (confirm("정말삭제하시겠습니까?")) {
      return mutate(postData.postId);
    } else {
      return;
    }
  };

  return (
    <>
      <StyleNav>
        <StyleShowBackgroud Show={show}></StyleShowBackgroud>

        {
          {
            option: (
              <StyleShow Show={show}>
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
              <StyleShow Show={show}>
                <p
                  onClick={() => {
                    setPreview(`/img/userprofile.png`);
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
              <StyleShow Show={show}>
                <p
                  onClick={() => {
                    navigate(`/post/${postData.postId}`, {
                      state: { runLog: postData }
                    });
                  }}
                >
                  수정하기
                </p>
                <p
                  onClick={() => {
                    DeleteConfirm();
                  }}
                >
                  삭제하기
                </p>
              </StyleShow>
            )
          }[navEvent]
        }

        <StyleButton>
          <div
            onClick={() => {
              navigate("/feed");
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

          <div
            onClick={() => {
              navigate(`/user/${nickname}`, { state: nickname });
            }}
          >
            마이페이지
          </div>
        </StyleButton>
      </StyleNav>
    </>
  );
};

export default Nav;
