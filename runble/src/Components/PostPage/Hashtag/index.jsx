import React, { useState, useCallback, useEffect } from "react";
import "./styles.css";
import useInput from "../../../hooks/useInput";

import { useRecoilState } from "recoil";
import { postData } from "../../../Recoil/Atoms/PostData";

const Hashtag = ({ merge }) => {
  const [hashtag, onChangeHashtag, setHashtag] = useInput("");
  const [hashArr, setHashArr] = useState([]);
  const [stop, setStop] = useState(false);
  const [post, setPost] = useRecoilState(postData);

  useEffect(() => {
    hashArr.length >= 3 ? setStop(true) : setStop(false);
  }, [hashArr]);

  const onKeyUp = useCallback(
    e => {
      /* 요소 불러오기, 만들기*/
      const $HashWrapOuter = document.querySelector(".HashWrapOuter");
      const $HashWrapInner = document.createElement("div");
      $HashWrapInner.className = "HashWrapInner";

      /* 태그를 클릭 이벤트 관련 로직 */
      $HashWrapInner.addEventListener("click", () => {
        $HashWrapOuter?.removeChild($HashWrapInner);
        setHashArr(hashArr.filter(hashtag => hashtag));
      });

      /* enter 키 코드 :13 */
      if (e.keyCode === 13 && e.target.value.trim() !== "") {
        $HashWrapInner.innerHTML = "#" + e.target.value;
        $HashWrapOuter?.appendChild($HashWrapInner);
        setHashArr(hashArr => [...hashArr, hashtag]);
        setHashtag("");
      }
    },
    [hashtag, hashArr]
  );

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
      <div className="HashWrapOuter"></div>
      {!stop && (
        <input
          className="HashInput"
          type="text"
          value={hashtag}
          onChange={onChangeHashtag}
          onKeyUp={onKeyUp}
          placeholder="#해시태그"
        />
      )}
      {stop && <div>해시태그는 3개 까지만 등록 가능합니다.</div>}
    </div>
  );
};

export default Hashtag;
