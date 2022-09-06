import React, {
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
  useEffect
} from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import useInput from "../../../Hooks/useInput";
import { postData } from "../../../Recoil/Atoms/PostData";

const AddContent = ({ merge }) => {
  const [content, onChangeContent] = useInput("");
  const [showWrite, setShowWrite] = useState(false);
  const [post, setPost] = useRecoilState(postData);
  const textRef = useRef(null);

  const onShowWrite = useCallback(() => {
    setShowWrite(true);
  }, []);

  useLayoutEffect(() => {
    if (textRef.current !== null) textRef.current.focus();
  });

  useEffect(() => {
    if (merge) {
      setPost(prev => ({
        ...prev,
        content
      }));
    }
  }, [merge]);

  return (
    <>
      {!showWrite ? (
        <NonWrite onClick={onShowWrite}>내용 작성</NonWrite>
      ) : (
        <Write value={content} ref={textRef} onChange={onChangeContent}></Write>
      )}
    </>
  );
};

export default AddContent;

const NonWrite = styled.div`
  width: 57px;
  height: 15px;
  left: 28px;
  top: 463px;

  font-family: "HYHeadLine-Medium";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;

  text-align: center;
  color: #000000;
`;

const Write = styled.textarea`
  position: absolute;
  width: 315px;
  height: 236px;
  left: 31px;
  top: 458px;

  background: #ebebeb;
`;
