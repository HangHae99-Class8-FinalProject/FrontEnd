import React, { useState, useEffect } from "react";
import useInput from "../../../Hooks/useInput";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { postData } from "../../../Recoil/Atoms/PostData";

const Hashtag = ({ merge, prevHashtag }) => {
  const [hashtag, onChangeHashtag, setHashtag] = useInput("");
  const [hashArr, setHashArr] = useState(prevHashtag || []);
  const [stop, setStop] = useState(false);
  const [post, setPost] = useRecoilState(postData);

  useEffect(() => {
    hashArr.length >= 6 ? setStop(true) : setStop(false);
  }, [hashArr]);

  console.log(hashArr);

  const onKeyPress = e => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    let updatedTagList = [...hashArr];
    updatedTagList.push(hashtag);
    setHashArr(updatedTagList);
    setHashtag("");
  };

  const deleteTagItem = e => {
    const deleteTagItem = e.target.innerText;
    const filteredTagList = hashArr.filter(
      tagItem => "#" + tagItem !== deleteTagItem
    );
    setHashArr(filteredTagList);
  };

  useEffect(() => {
    if (merge) {
      setPost(prev => ({
        ...prev,
        hashtag: hashArr
      }));
    }
  }, [merge]);

  return (
    <HashTagWrap>
      {hashArr.map((hash, idx) => {
        return (
          <HashTagBox key={idx} value={hash} onClick={deleteTagItem}>
            <span>{"#" + hash}</span>
          </HashTagBox>
        );
      })}
      {!stop && (
        <HashTagInput
          type="text"
          value={hashtag}
          onChange={onChangeHashtag}
          onKeyUp={onKeyPress}
          placeholder="#해시태그"
          maxLength={10}
        />
      )}
      {stop && <div>해시태그는 6개 까지만 등록 가능합니다.</div>}
    </HashTagWrap>
  );
};

export default Hashtag;

const HashTagWrap = styled.div`
  display: flex;
  padding: 0px 16px;
  gap: 10px;
  flex-wrap: wrap;
`;

const HashTagBox = styled.div`
  padding: 1px 10px 4px;
  gap: 10px;
  min-width: 60px;
  height: 22px;
  background: #e6e6e6;
  border-radius: 20px;
  border: none;
  flex-wrap: nowrap;
  & span {
    font-family: "Noto Sans CJK KR";
    width: 40px;
    height: 17px;
    font-size: 12px;
    color: #1a1a1a;
    text-align: center;
    line-height: 17px;
  }
`;

const HashTagInput = styled.input`
  border: none;
  padding: 1px 10px 4px;
  gap: 10px;
  width: 60px;
  height: 22px;
  background: #e6e6e6;
  border-radius: 20px;
`;
