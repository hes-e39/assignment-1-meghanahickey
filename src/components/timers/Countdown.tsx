import { useState } from "react";
import type { ChangeEvent } from "react";
import { calculateSeconds } from "../../utils/helpers";
import Time from "../generic/DisplayTime";
import { Buttons } from "../generic/Button";
import type { buttonInfo } from "../generic/Button";

const interval = { intervalId: 0, isRunning: false };
const initialState = { seconds: 0, minutes: 0 };

const Countdown = () => {
  const [currSeconds, setSeconds] = useState(0);
  const setInputTime = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "numMinutes") {
      initialState.minutes = event.target.valueAsNumber;
    } else {
      initialState.seconds = event.target.valueAsNumber;
    }
    setSeconds(calculateSeconds(initialState));
  };
  const decrementSeconds = () => {
    setSeconds((currSeconds) => {
      if (currSeconds > 0) {
        return currSeconds - 1;
      } else {
        clearInterval(interval.intervalId);
        interval.isRunning = false;
        return currSeconds;
      }
    });
  };
  const onStart = () => {
    if (!interval.isRunning && currSeconds > 0) {
      interval.intervalId = setInterval(decrementSeconds, 1000);
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
      interval.intervalId = setInterval(decrementSeconds, 1000);
      interval.isRunning = true;
    }
  };

  const onReset = () => {
    if (interval.isRunning) {
      clearInterval(interval.intervalId);
      interval.isRunning = false;
    }
    setSeconds(calculateSeconds(initialState));
  };
  const buttons: buttonInfo[] = [
    { name: "Start", clickCallback: onStart },
    { name: "Pause", clickCallback: onPause },
    { name: "Resume", clickCallback: onResume },
    { name: "Reset", clickCallback: onReset },
  ];

  return (
    <div>
      <form>
        <div>
          <label>
            Minutes{" "}
            <input
              id="numMinutes"
              type="number"
              min="0"
              max="9999"
              onChange={setInputTime}
            />
          </label>
        </div>
        <div>
          <label>
            Seconds{" "}
            <input
              id="numSeconds"
              type="number"
              min="0"
              max="59"
              onChange={setInputTime}
            />
          </label>
        </div>
      </form>
      <Time currSeconds={currSeconds} />
      <Buttons inputButtons={buttons} />
    </div>
  );
};

export default Countdown;
