import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import S3upload from "react-aws-s3";
import imageCompression from "browser-image-compression";

import { postData } from "../../../Recoil/Atoms/PostData";
import { useRecoilState } from "recoil";
import { S3config } from "../../../Utils/S3Config";

window.Buffer = window.Buffer || require("buffer").Buffer;

const AddPhoto = ({ merge, prevImg }) => {
  const [previewImages, setPreviewImages] = useState(prevImg || []);
  const [uploadImages, setUploadImages] = useState(prevImg || []);
  const [post, setPost] = useRecoilState(postData);
  const imgRef = useRef();
  console.log(uploadImages);

  // 이미지 업로드 로직
  const onSubmitImg = async () => {
    const length = imgRef.current.files.length;
    if (length > uploadImages) {
      const ReactS3Client = new S3upload(S3config);
      for (let i = 0; i < length; i++) {
        await ReactS3Client.uploadFile(
          imgRef.current.files[i],
          imgRef.current.files[i].name
        )
          .then(data => {
            uploadImages.push(data.location);
          })
          .catch(error => console.error(error));
      }
    }
    setPost(prev => ({
      ...prev,
      image: uploadImages,
      isLoading: false
    }));
  };

  const onChangeImg = async () => {
    const imgArray = imgRef.current.files;
    let imgUrls = [...previewImages];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    try {
      for (let i = 0; i < imgArray.length; i++) {
        const comporessedFile = await imageCompression(imgArray[i], options);
        const imgUrl = URL.createObjectURL(comporessedFile);
        imgUrls.push(imgUrl);
      }
    } catch (error) {
      console.error(error);
    }
    setPreviewImages(imgUrls);
  };

  const deletePhoto = idx => {
    setPreviewImages(previewImages.filter((_, index) => index !== idx));
    setUploadImages(uploadImages?.filter((_, index) => index !== idx));
    const dataTranster = new DataTransfer();
    Array.from(imgRef.current.files)
      .filter((_, index) => index !== idx)
      .forEach(file => {
        dataTranster.items.add(file);
      });
    imgRef.current.files = dataTranster.files;
  };

  useEffect(() => {
    if (merge) {
      onSubmitImg();
    }
  }, [merge]);

  return (
    <PhotoWrap>
      {previewImages &&
        previewImages.map((img, idx) => {
          return (
            <PreviewImges
              key={idx}
              src={img}
              alt="첨부한 이미지"
              onClick={() => deletePhoto(idx)}
            />
          );
        })}
      <AddButton>
        <input ref={imgRef} type="file" multiple onChange={onChangeImg} />+
      </AddButton>
    </PhotoWrap>
  );
};

export default AddPhoto;

const PhotoWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const AddButton = styled.label`
  width: 59px;
  height: 55.87px;
  background-color: gray;
  justify-content: center;
  align-items: center;
  display: flex;
  font-family: "VITRO CORE OTF";
  font-style: normal;
  font-weight: 900;
  font-size: 48px;
  line-height: 64px;

  color: #ffffff;
  & input {
    display: none;
  }
`;

const PreviewImges = styled.img`
  width: 59px;
  height: 55.87px;
`;
