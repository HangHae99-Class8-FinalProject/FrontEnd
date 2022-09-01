import React, { useState, useEffect } from "react";
import useInterval from "../../hooks/useInterval";
import { runData } from "../../Recoil/Atoms/RunData";
import { useRecoilState } from "recoil";

const RunTimer = ({ stopInterval, endRun }) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [path, setPath] = useRecoilState(runData);

  useInterval(
    () => {
      if (second === 59) {
        setMinute(prev => prev + 1);
        setSecond(-1);
        if (minute === 59) {
          setHour(prev => prev + 1);
          setMinute(0);
        }
      }
      setSecond(prev => prev + 1);
    },
    stopInterval ? null : 1000
  );

  useEffect(() => {
    if (endRun) {
      setPath(prev => ({
        ...prev,
        time: { hour, minute, second }
      }));
    }
  }, [endRun]);

  return (
    <div>
      {hour} : {minute} : {second}
    </div>
  );
};
export default RunTimer;
