import React, { useState } from "react";
import { useGoal } from "../../../Hooks/useGoal";
import {
  StyleGoal,
  StyleGoalButton,
  StyleModal,
  StyleInput,
  StyleButton
} from "./style";
const Goal = () => {
  const { mutate } = useGoal();
  const [modal, setModal] = useState(false);
  const [goal, setGoal] = useState({
    goal: ""
  });
  const onChangeHandeler = e => {
    const { name, value } = e.target;
    setGoal({ ...goal, [name]: value });
  };

  const onSubmitHandeler = () => {
    console.log(goal);
    mutate(goal);
    setGoal({
      goal: ""
    });
  };
  return (
    <div>
      <StyleGoal>
        <StyleGoalButton
          onClick={() => {
            setModal(true);
          }}
        >
          목표설정하기
        </StyleGoalButton>
        <div>이번주 목표를 입력하세요</div>
      </StyleGoal>
      {modal ? (
        <div>
          <StyleModal>
            <div>
              <label>일주일 간의 목표를 설정해주세요!</label>
              <StyleInput
                name="goal"
                onChange={onChangeHandeler}
                type="number"
                min="0"
                value={goal.goal}
                placeholder="0km"
              ></StyleInput>

              <StyleButton>
                <span
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  취소
                </span>
                <span
                  onClick={() => {
                    onSubmitHandeler();
                  }}
                >
                  등록
                </span>
              </StyleButton>
            </div>
          </StyleModal>
        </div>
      ) : null}
    </div>
  );
};
export default Goal;
