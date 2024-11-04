import { useState } from "react";
import Time from "../generic/DisplayTime";
import { Buttons } from "../generic/Button";
import type { buttonInfo } from "../generic/Button";

const interval = { intervalId: 0, isRunning: false };

const Stopwatch = () => {
  const [currSeconds, setSeconds] = useState(0);

  const incrementSeconds = () => {
        setSeconds((currSeconds) => currSeconds + 1);
  };
  const onStart = () => {
    if (!interval.isRunning) {
      setSeconds(0);
      interval.intervalId = setInterval(incrementSeconds, 1000);
      interval.isRunning = true;
    }
  };

  const onPause = () => {
    if (interval.isRunning) {
      clearInterval(interval.intervalId);
      interval.isRunning = false;
    }
  };

  const onResume = () => {
    if (!interval.isRunning) {
      interval.intervalId = setInterval(incrementSeconds, 1000);
      interval.isRunning = true;
    }
  };

  const onReset = () => {
    if (interval.isRunning) {
      clearInterval(interval.intervalId);
      interval.isRunning = false;
    }
    setSeconds(0);
  };

  const buttons: buttonInfo[] = [
    { name: "Start", clickCallback: onStart },
    { name: "Pause", clickCallback: onPause },
    { name: "Resume", clickCallback: onResume },
    { name: "Reset", clickCallback: onReset },
  ];

  return (
    <div>
      <Time currSeconds={currSeconds} />
      <Buttons inputButtons={buttons} />
    </div>
  );
};

export default Stopwatch;
