import React, { useState } from "react";
import styled from "styled-components";
import S3upload from "react-aws-s3";
import imageCompression from "browser-image-compression";

window.Buffer = window.Buffer || require("buffer").Buffer;

const AddPhoto = () => {
  const [uploadImages, setUploadImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY
  };

  // 이미지 업로드 로직
  const onSubmitImg = e => {
    const arr = [];
    if (e.target.files.length > 0) {
      const ReactS3Client = new S3upload(config);
      const legth = e.target.files.length;
      for (let i = 0; i < legth; i++) {
        ReactS3Client.uploadFile(e.target.files[i], e.targe.files[i].name)
          .then(data => {
            arr.push(data.location);
            setUploadImages([...arr]);
          })
          .catch(error => console.error(error));
      }
    }
  };

  const onChangeImg = async e => {
    const imgArray = e.target.files;
    console.log(imgArray.length);
    let imgUrls = [...previewImages];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    try {
      for (let i = 0; i < imgArray.length; i++) {
        const comporessedFile = await imageCompression(imgArray[i], options);
        console.log(comporessedFile);
        const imgUrl = URL.createObjectURL(comporessedFile);
        console.log(imgUrl);
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

  console.log(previewImages);

  return (
    <PhotoWrap>
      {previewImages &&
        previewImages.map((img, idx) => {
          return (
            <>
              <PreviewImges
                key={idx}
                src={img}
                alt="첨부한 이미지"
                onClick={() => deletePhoto(idx)}
              />
            </>
          );
        })}
      <AddButton onSubmit={onSubmitImg}>
        <input type="file" multiple onChange={onChangeImg} />+
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
