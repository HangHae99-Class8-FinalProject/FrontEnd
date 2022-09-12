import React, { useState, useEffect } from "react";
import "./styles.css";
import useInput from "../../../Hooks/useInput";

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
    <div className="hashDivrap">
      <div className="HashWrapOuter">
        {hashArr.map((hash, idx) => {
          return (
            <div
              key={idx}
              className="HashWrapInner"
              value={hash}
              onClick={deleteTagItem}
            >
              {"#" + hash}
            </div>
          );
        })}
      </div>
      {!stop && (
        <input
          className="HashInput"
          type="text"
          value={hashtag}
          onChange={onChangeHashtag}
          onKeyUp={onKeyPress}
          placeholder="#해시태그"
        />
      )}
      {stop && <div>해시태그는 6개 까지만 등록 가능합니다.</div>}
    </div>
  );
};

export default Hashtag;
