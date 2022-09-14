import React from "react";
import {
  StyleProgress,
  StyleProgressBox,
  StyleWrap,
  StyleProgressGoalData,
  StyleNextProgress,
  StyleSevenProgress,
  StyleSevenTitle,
  StyleSevenGoal,
  StyleGoalDate,
  StyleSevenDate,
  StyleDistanceBox
} from "./style";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
const weekOfMonth = m => m.week() - moment(m).startOf("month").week() + 1;
const nowDate = moment().utc(true);
const goalDate = nowDate.format("MM월 ") + weekOfMonth(nowDate) + "주차"; // 현재 날짜

const Progress = ({ goalData }) => {
  console.log(goalData.getUserInfo);
  const percentage = 50;
  return (
    <StyleWrap>
      <StyleProgress>
        <Swiper
          spaceBetween={30}
          style={{ height: "230px" }}
          pagination={{
            dynamicBullets: true
          }}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <StyleProgressBox>
              <StyleProgressGoalData>
                {goalData.getUserInfo.goal}km 달성까지
              </StyleProgressGoalData>
              <div>
                <CircularProgressbarWithChildren
                  value={percentage}
                  text={`${percentage}%`}
                  strokeWidth={20}
                  styles={{
                    root: { height: "104px" },
                    path: {
                      stroke: "rgba(240, 56, 0, 1)",
                      strokeLinecap: "butt",
                      transition: "stroke-dashoffset 0.5s ease 0s"
                    },

                    trail: {
                      stroke: "rgba(77, 77, 77, 1)"
                    },
                    text: {
                      fill: "#ffffff",
                      fontSize: "18px"
                    }
                  }}
                />
              </div>
            </StyleProgressBox>
          </SwiperSlide>
          <SwiperSlide>
            <StyleNextProgress>
              <StyleSevenProgress>
                <StyleSevenTitle>
                  <StyleSevenGoal>
                    한주간{goalData.getUserInfo.goal}km런닝
                  </StyleSevenGoal>
                  <StyleGoalDate>{goalDate}</StyleGoalDate>
                </StyleSevenTitle>
                <StyleSevenDate>
                  <div>
                    <span>월</span>
                    <span>k</span>
                    <span>0:12:23</span>
                  </div>
                  <div>
                    <span>화</span>
                    <span>k</span>
                    <span>0:12:23</span>
                  </div>
                  <div>
                    <span>수</span>
                    <span>k</span>
                    <span>0:12:23</span>
                  </div>
                  <div>
                    <span>목</span>
                    <span>k</span>
                    <span>0:12:23</span>
                  </div>
                  <div>
                    <span>금</span>
                    <span>k</span>
                    <span>0:12:23</span>
                  </div>
                  <div>
                    <span>토</span>
                    <span>k</span>
                    <span>0:12:23</span>
                  </div>
                  <div>
                    <span>일</span>
                    <span>k</span>
                    <span>0:12:23</span>
                  </div>
                </StyleSevenDate>
                <StyleDistanceBox>
                  <div>
                    <span>6.2k</span>
                    <span>총거리</span>
                  </div>
                  <div>
                    <span>5d</span>
                    <span>총운동일</span>
                  </div>
                </StyleDistanceBox>
              </StyleSevenProgress>
            </StyleNextProgress>
          </SwiperSlide>
        </Swiper>
      </StyleProgress>
    </StyleWrap>
  );
};
export default Progress;
