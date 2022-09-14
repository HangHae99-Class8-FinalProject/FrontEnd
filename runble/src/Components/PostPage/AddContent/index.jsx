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

const AddContent = ({ merge, prevContent }) => {
  const [content, onChangeContent] = useInput(prevContent || "");

  const [post, setPost] = useRecoilState(postData);
  const textRef = useRef(null);

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
    <ContentBox>
      <Write value={content} ref={textRef} onChange={onChangeContent}></Write>
    </ContentBox>
  );
};

export default AddContent;

const ContentBox = styled.div`
  padding: 20px 16px;
  height: 220px;
`;

const Write = styled.textarea`
  background: #e6e6e6;
  border-radius: 4px;
  padding: 10px 0px 10px 10px;
  gap: 10px;
  width: 343px;
  height: 180px;
`;
