import { useEffect, useState } from "react";

const Timer = ({ questionNumber, setStop }) => {
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    if (timer === 0) return setStop(true);
    const timerIntervel = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, [1000]);
    return () => {
      clearInterval(timerIntervel);
    };
  }, [timer, setStop]);
  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  return timer;
};

export default Timer;
