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
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={5}
        styles={buildStyles({
          textColor: "red",
          pathColor: "turquoise",
          trailColor: "gold"
        })}
      />
    </StyleProgress>
  );
};
export default Progress;
