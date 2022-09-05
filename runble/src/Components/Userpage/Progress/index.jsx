import React from "react";
import { StyleProgress, StyleProgressBox } from "./style";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren
} from "react-circular-progressbar";

const Progress = () => {
  const percentage = 50;
  return (
    <StyleProgress>
      목표를 설정해주세요
      <CircularProgressbarWithChildren
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={5}
        styles={{
          root: { height: "100px" },
          path: {
            stroke: "#4fce84",
            strokeLinecap: "butt",
            transition: "stroke-dashoffset 0.5s ease 0s"
          },

          trail: {
            stroke: "#d7d7d7"
          },
          text: {
            fill: "#333333",
            fontSize: "18px"
          },
          background: {
            fill: "#3e98c7"
          }
        }}
      />
    </StyleProgress>
  );
};
export default Progress;
