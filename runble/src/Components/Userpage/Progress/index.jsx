import React from "react";
import { StyleProgress, StyleProgressBox, StyleWrap, StyleGoal } from "./style";
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useProgress } from "../../../Hooks/useProgress";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
const weekOfMonth = m => m.week() - moment(m).startOf("month").week() + 1;
const nowDate = moment().utc(true);
const goalDate = nowDate.format("MM월 ") + weekOfMonth(nowDate) + "주차"; // 현재 날짜

const Progress = ({ goalData }) => {
  console.log(goalData);
  const percentage = 50;
  return (
    <StyleWrap>
      <StyleGoal>
        <span>목표 달성도 </span>
      </StyleGoal>

      <StyleProgress>
        <Swiper
          style={{ height: "30rem" }}
          pagination={{
            dynamicBullets: true
          }}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <div>
              <span>{goalDate}</span>
            </div>
            <div style={{ margin: "3rem 0" }}>
              <div>10km</div>
              <CircularProgressbarWithChildren
                value={percentage}
                text={`${percentage}%`}
                strokeWidth={10}
                styles={{
                  root: { height: "15rem" },
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
                    fontSize: "1.8rem"
                  }
                }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide></SwiperSlide>
        </Swiper>
      </StyleProgress>
    </StyleWrap>
  );
};
export default Progress;
