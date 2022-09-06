import React from "react";
import { StyleProgress, StyleProgressBox, StyleWrap, StyleGoal } from "./style";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Progress = () => {
  const percentage = 50;
  const today = new Date();
  const year = today.getFullYear(); // 년
  const month = today.getMonth(); // 월
  const day = today.getDate(); // 일
  const sevenDay = new Date(year, month, day + 7);
  const todayDate = today.toLocaleDateString();
  const sevenDate = sevenDay.toLocaleDateString();
  // console.log(today.toLocaleDateString());
  // console.log(sevenDay.toLocaleDateString());
  return (
    <StyleWrap>
      <StyleGoal>
        <h3>이번주목표도</h3>
        <div>
          <span>{todayDate}</span>
          <span>{sevenDate}</span>
        </div>
      </StyleGoal>
      <StyleProgress>
        <span>??km</span>
        <CircularProgressbarWithChildren
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={10}
          styles={{
            root: { height: "150px" },
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
            }
          }}
        />
      </StyleProgress>
    </StyleWrap>
  );
};
export default Progress;
