import React, { useCallback } from "react";
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
  StyleDistanceBox,
  StyleSpanDistance,
  StyleSpanTime
} from "./style";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
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
  const sevenTime = goalData.getUserInfo.weekOfTime;
  const result = sevenTime.filter(distance => distance !== 0);

  const divideTime = useCallback(time => {
    let seconds = Math.floor(time % 60);
    let minute = Math.floor((time / 60) % 60);
    let hours = Math.floor((time / (60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minute = minute < 10 ? "0" + minute : minute;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minute + ":" + seconds;
  }, []);
  const percentage = goalData.getUserInfo.percent;
  return (
    <StyleWrap>
      <div>
        <StyleProgress>
          <Swiper
            style={{ height: "23rem" }}
            pagination={{
              dynamicBullets: true
            }}
            modules={[Pagination]}
          >
            <SwiperSlide>
              <StyleProgressBox>
                <StyleProgressGoalData>{goalData.getUserInfo.goal}km 달성까지</StyleProgressGoalData>
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
                    <StyleSevenGoal>한주간{goalData.getUserInfo.goal}km런닝</StyleSevenGoal>
                    <StyleGoalDate>{goalDate}</StyleGoalDate>
                  </StyleSevenTitle>
                  <StyleSevenDate>
                    <div>
                      <span>월</span>
                      <span>화</span>
                      <span>수</span>
                      <span>목</span>
                      <span>금</span>
                      <span>토</span>
                      <span>일</span>
                    </div>
                    <div>
                      {goalData.getUserInfo.weekOfDistance.map((distance, idx) => (
                        <StyleSpanDistance key={idx} Distance={distance}>
                          {distance}K
                        </StyleSpanDistance>
                      ))}
                    </div>
                    <div>
                      {goalData.getUserInfo.weekOfTime.map((time, idx) => (
                        <StyleSpanTime Time={time} key={idx}>
                          {divideTime(time)}
                        </StyleSpanTime>
                      ))}
                    </div>
                  </StyleSevenDate>
                  <StyleDistanceBox>
                    <div>
                      <span>{goalData.getUserInfo.distance}K</span>
                      <span>총거리</span>
                    </div>
                    <div>
                      <span>{result.length}d</span>
                      <span>총운동일</span>
                    </div>
                  </StyleDistanceBox>
                </StyleSevenProgress>
              </StyleNextProgress>
            </SwiperSlide>
          </Swiper>
        </StyleProgress>
      </div>
    </StyleWrap>
  );
};
export default Progress;
