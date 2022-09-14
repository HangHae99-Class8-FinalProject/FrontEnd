import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import imageCompression from "browser-image-compression";
import S3upload from "react-aws-s3";

import { S3config } from "../../Utils/S3Config";
import { instance } from "../../Utils/Instance";
import useQueryDebounce from "../../Hooks/useQueryDebounce";

import { ReactComponent as SmallCamera } from "../../Icons/sm-camera.svg";
import Profile from "../../Icons/profile.svg";

window.Buffer = window.Buffer || require("buffer").Buffer;

function ProfileUpload({ userData }) {
  const [nickname, setNickname] = useState("");
  const [previewImage, setPrevieImage] = useState(Profile);
  const [image, setImage] = useState(null);
  const [isLodded, setIsLodded] = useState("");
  const [error, setError] = useState(false);
  const fileUpload = useRef(null);
  const navigate = useNavigate();

  const debounceNick = useQueryDebounce(nickname, 500);

  const onChangeNickName = e => {
    const { value } = e.target;
    const onlyHangul = value.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, "");
    setNickname(onlyHangul);
  };

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };

  const chgPreview = async e => {
    const imageFile = e.target.files[0];
    const compressedFile = await imageCompression(imageFile, options);
    const imageUrl = URL.createObjectURL(compressedFile);
    setPrevieImage(imageUrl);
  };

  const submitImage = () => {
    if (fileUpload.current.file) {
      const ReactS3Client = new S3upload(S3config);
      let file = fileUpload.current.files[0];
      let newFileName = fileUpload.current.files[0].name;
      ReactS3Client.uploadFile(file, newFileName).then(data => {
        if (data.status === 204) {
          setImage(data.location);
        }
      });
    }
    setIsLodded(true);
  };

  const signupUser = async () => {
    const { data } = await instance.post("/api/user/signup", {
      email: userData.email,
      nickname,
      image,
      provider: userData.provider
    });
    return data;
  };

  const nicknameCheck = async debounceNick => {
    const { data } = await instance.post(
      `/api/user/check?nickname=${debounceNick}`
    );
    return data;
  };

  const { mutate: signUp } = useMutation(signupUser, {
    onSuccess: data => {
      console.log(data);
      const token = data.token;
      const userData = {
        email: data.email,
        image: data.image,
        nickname: data.nickname,
        userId: data.userId,
        provider: data.provider
      };
      window.localStorage.setItem("userData", JSON.stringify(userData));
      window.localStorage.setItem("token", token);
      navigate(`/user/${data.nickname}`);
    }
  });

  const { mutate: duplicateCheck, data: checkResult } =
    useMutation(nicknameCheck);

  const onSubmitProfile = () => {
    submitImage();
  };

  useEffect(() => {
    if (isLodded) {
      signUp();
    }
  }, [isLodded]);

  useEffect(() => {
    if (debounceNick) {
      duplicateCheck(debounceNick, {
        onSuccess: data => {
          if (data.duplicate) {
            setError(true);
          } else {
            setError(false);
          }
        }
      });
    }
  }, [debounceNick]);

  return (
    <>
      <label>
        <Image src={previewImage}></Image>
        <CameraIcon>
          <SmallCamera />
        </CameraIcon>
        <FileBox
          type="file"
          accept="image/*"
          name="profile_Img"
          ref={fileUpload}
          onChange={chgPreview}
          id="imgFile"
        />
      </label>
      <NickNameInput
        onChange={onChangeNickName}
        value={nickname}
        type="text"
        maxLength={5}
        minLength={2}
      />
      {!error ? (
        <NickForm>닉네임은 한글 2-5자 이내로 입력해주세요</NickForm>
      ) : (
        <NickForm style={{ color: "red" }}>
          이미 존재하는 닉네임입니다.
        </NickForm>
      )}
      <JoinBtn onClick={onSubmitProfile} disabled={error}>
        <p>가입하기</p>
      </JoinBtn>
    </>
  );
}

export default ProfileUpload;

const Image = styled.img`
  width: 160px;
  height: 160px;
  margin: 0px 108px 72px;
`;

const FileBox = styled.input`
  display: none;
`;

const CameraIcon = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 214px;
  top: 346px;
`;

const NickNameInput = styled.input`
  border: none;
  border-bottom: 1px solid #e6e6e6;
  box-sizing: border-box;
  width: 214px;
  height: 41px;
  margin: 0 80px 12px;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

const NickForm = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  color: #b3b3b3;
`;

const JoinBtn = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 97px;
  bottom: 0px;
  background: #4d4d4d;
  & p {
    font-size: 24px;
    text-align: center;
    color: #ffffff;
  }
  &:disabled {
    background: #b3b3b3;
  }
`;
