import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import imageCompression from "browser-image-compression";
import S3upload from "react-aws-s3";

import { S3config } from "../../Utils/S3Config";
import { instance } from "../../Utils/Instance";
import useQueryDebounce from "../../Hooks/useQueryDebounce";

window.Buffer = window.Buffer || require("buffer").Buffer;

function ProfileUpload({ userData }) {
  const [nickname, setNickname] = useState("");
  const [previewImage, setPrevieImage] = useState("");
  const [image, setImage] = useState("");
  const [isLodded, setIsLodded] = useState("");
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
      image
    });
    return data;
  };

  const nicknameCheck = async () => {
    const { data } = await instance.post(
      `/api/user/check?nickname=${debounceNick}`
    );
  };

  const { mutate: signUp, isLoading } = useMutation(signupUser, {
    onSuccess: data => {
      console.log(data);
      const token = data.token;
      const userData = {
        email: data.email,
        image: data.image,
        nickname: data.nickname,
        userId: data.userId
      };
      window.localStorage.setItem("userData", JSON.stringify(userData));
      window.localStorage.setItem("token", token);
      navigate(`/user/${data.nickname}`);
    }
  });

  const { mutate: nickNameCheck, data: checkResult } =
    useMutation(nicknameCheck);

  const onSubmitProfile = () => {
    submitImage();
  };

  //
  useEffect(() => {
    if (isLodded) {
      signUp();
    }
  }, [isLodded]);

  useEffect(() => {
    if (debounceNick) {
      nickNameCheck();
    }
  }, [debounceNick]);

  return (
    <>
      {isLoading && <div>회원가입 중</div>}
      <label htmlFor="imgFile">
        <Image src={previewImage} />
      </label>
      <FileBox
        type="file"
        accept="image/*"
        name="profile_Img"
        ref={fileUpload}
        onChange={chgPreview}
        id="imgFile"
      />
      <NicInput
        onChange={onChangeNickName}
        value={nickname}
        type="text"
        maxLength={5}
        minLength={2}
      />
      <p>닉네임은 한글 2-5자 이내로 입력해주세요</p>
      {checkResult?.duplicate && <div>닉네임 중복됨</div>}
      <JoinBtn onClick={onSubmitProfile}>JOIN US</JoinBtn>
    </>
  );
}

export default ProfileUpload;

const Image = styled.img`
  width: 200px;
  height: 236px;
  display: block;
  margin: 100px auto;
`;
const FileBox = styled.input`
  display: none;
`;
const NicInput = styled.input`
  display: block;
  margin: 0 auto;
`;
const JoinBtn = styled.div`
  width: 100%;
  height: 100px;
  color: white;
  font-size: 80px;
  background-color: black;
  text-align: center;
  margin-top: 450px;
`;
