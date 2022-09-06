import React, { useState } from "react";
import { useAddGoalMutation } from "../../../Hooks/useGoal";
import { StyleGoal, StyleModal, StyleInput } from "./style";
const Goal = () => {
  const { mutate } = useAddGoalMutation();
  const [modal, Setmodal] = useState(false);
  const [goal, Setgoal] = useState({
    goal: ""
  });
  const onChangeHandeler = e => {
    const { name, value } = e.target;
    Setgoal({ ...goal, [name]: value });
  };

  const onSubmitHandeler = () => {
    // mutate(goal);
    Setgoal({
      goal: ""
    });
  };
  return (
    <>
      <StyleGoal
        onClick={() => {
          Setmodal(true);
        }}
      >
        목표설정해주세요
      </StyleGoal>
      {modal ? (
        <StyleModal>
          <div>
            <label>일주일간의 목표 km을 입력해주세요</label>
            <StyleInput
              name="goal"
              onChange={onChangeHandeler}
              type="number"
              min="0"
              value={goal.goal}
            ></StyleInput>
          </div>
          <div>
            <button
              onClick={() => {
                Setmodal(false);
              }}
            >
              취소
            </button>
            <button
              onClick={() => {
                onSubmitHandeler();
              }}
            >
              등록
            </button>
          </div>
        </StyleModal>
      ) : null}
    </>
  );
};
export default Goal;
