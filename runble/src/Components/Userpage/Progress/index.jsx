import React from "react";
import { StyleProgress, StyleProgressBox, StyleWrap, StyleGoal } from "./style";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";
const weekOfMonth = m => m.week() - moment(m).startOf("month").week() + 1;
const nowDate = moment().utc(true);
const goalDate = nowDate.format("MM월 ") + weekOfMonth(nowDate) + "주차"; // 현재 날짜

const Progress = () => {
  const percentage = 50;

  return (
    <StyleWrap>
      <StyleGoal>
        <span>목표 달성도 </span>
      </StyleGoal>
      <StyleProgress>
        <div>
          <span>{goalDate}</span>
        </div>
        <div style={{ margin: "30px 0" }}>
          <div>10km</div>
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
        </div>
      </StyleProgress>
    </StyleWrap>
  );
};
export default Progress;
