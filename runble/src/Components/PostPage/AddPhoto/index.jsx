import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import S3upload from "react-aws-s3";
import imageCompression from "browser-image-compression";

import { postData } from "../../../Recoil/Atoms/PostData";
import { useRecoilState } from "recoil";

window.Buffer = window.Buffer || require("buffer").Buffer;

const AddPhoto = ({ merge, prevImg }) => {
  const [uploadImages, setUploadImages] = useState([]);
  const [previewImages, setPreviewImages] = useState(prevImg || []);
  const [post, setPost] = useRecoilState(postData);
  const [upLoading, setUpLoading] = useState(false);
  const imgRef = useRef();

  console.log(uploadImages);

  const config = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION
  };

  // 이미지 업로드 로직
  const onSubmitImg = async () => {
    const arr = prevImg || [];
    console.log(imgRef.current.files);
    const length = imgRef.current.files.length;
    if (length > 0) {
      const ReactS3Client = new S3upload(config);
      for (let i = 0; i < length; i++) {
        await ReactS3Client.uploadFile(
          imgRef.current.files[i],
          imgRef.current.files[i].name
        )
          .then(data => {
            arr.push(data.location);
            console.log("arr:", arr);
            setUploadImages([...arr]);
          })
          .catch(error => console.error(error));
      }
      setUpLoading(true);
    }
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
  };

  useEffect(() => {
    if (merge) {
      onSubmitImg();
    }
  }, [merge]);

  useEffect(() => {
    if (upLoading) {
      setPost(prev => ({
        ...prev,
        image: uploadImages,
        isCompleted: true
      }));
    }
  }, [upLoading]);

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
