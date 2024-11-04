import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import Time from "../generic/DisplayTime";
import { Buttons } from "../generic/Button";
import type { buttonInfo } from "../generic/Button";

const workInterval = { intervalId: 0, isRunning: false };
const restInterval = { intervalId: 0, isRunning: false };
const initialState = { work: 0, rest: 0, rounds: 1 };

const Tabata = () => {
  const [workTime, setWork] = useState(0);
  const [restTime, setRest] = useState(0);
  const [currRound, setRound] = useState(0);

  const setInitialState = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "work") {
      initialState.work = event.target.valueAsNumber;
      setWork(initialState.work);
    } else if (event.target.id === "rest") {
      initialState.rest = event.target.valueAsNumber;
      setRest(initialState.rest);
    } else {
      initialState.rounds = event.target.valueAsNumber;
      setRound(initialState.rounds);
    }
  };
  const decrementWork = () => {
    setWork((workTime: number) => {
        console.log("decrementing work");
      if (workTime > 0) {
        console.log("decrementing work again");
        return workTime - 1;
      } else {        
        clearInterval(workInterval.intervalId);
        workInterval.isRunning = false;
        return workTime;
      }
    });
  };
  const decrementRest = () => {
    setRest((restTime: number) => {
      if (restTime > 0) {
        return restTime - 1;
      } else {        
        clearInterval(restInterval.intervalId);
        restInterval.isRunning = false;
        return restTime;
      }
    });
  };

  useEffect(() => {
    if (workInterval.isRunning && workTime === 0) {
        clearInterval(workInterval.intervalId);
        workInterval.isRunning = false;
        if (currRound > 0) {
            restInterval.intervalId = setInterval(decrementRest, 1000);
            restInterval.isRunning = true;
        }
    } else if (restInterval.isRunning && restTime === 0) {
        clearInterval(restInterval.intervalId);
        restInterval.isRunning = false;
        if (currRound > 1){
            setWork(initialState.work);
            setRest(initialState.rest);
            workInterval.intervalId = setInterval(decrementWork, 1000);
            workInterval.isRunning = true;
        }
        setRound(currRound - 1);
    }
  }, [workTime, restTime]);
  const onStart = () => {
    if (!workInterval.isRunning && workTime > 0) {
      workInterval.intervalId = setInterval(decrementWork, 1000);
      workInterval.isRunning = true;
    } else if (!restInterval.isRunning && restTime > 0) {
        restInterval.intervalId = setInterval(decrementRest, 1000);
        restInterval.isRunning = true;
    }
  };

  const onPause = () => {
    if (workInterval.isRunning) {
      clearInterval(workInterval.intervalId);
      workInterval.isRunning = false;
    }
    else if (restInterval.isRunning) {
            clearInterval(restInterval.intervalId);
            restInterval.isRunning = false;
    }
  };

  const onResume = () => {
    if (!workInterval.isRunning && workTime > 0) {
        workInterval.intervalId = setInterval(decrementWork, 1000);
        workInterval.isRunning = true;
      } else if (!restInterval.isRunning && restTime > 0) {
          restInterval.intervalId = setInterval(decrementRest, 1000);
          restInterval.isRunning = true;
      }
  };

  const onReset = () => {
    if (workInterval.isRunning) {
      clearInterval(workInterval.intervalId);
      workInterval.isRunning = false;
    } else if (restInterval.isRunning) {
        clearInterval(restInterval.intervalId);
        restInterval.isRunning = false;  
    }
    setWork(initialState.work);
    setRest(initialState.rest);
    setRound(initialState.rounds);
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
            Work (seconds) {" "}
            <input
              id="work"
              type="number"
              min="0"
              max="9999"
              onChange={setInitialState}
            />
          </label>
        </div>
        <div>
          <label>
            Rest (seconds) {" "}
            <input
              id="rest"
              type="number"
              min="0"
              max="9999"
              onChange={setInitialState}
            />
          </label>
        </div>
        <div>
          <label>
            Rounds{" "}
            <input
              id="numRounds"
              type="number"
              min="1"
              max="9999"
              onChange={setInitialState}
            />
          </label>
        </div>
      </form>
      <div>Work Time <Time currSeconds={workTime}/></div>
      <div>Rest Time <Time currSeconds={restTime}/></div>
      <div>Rounds: {currRound}</div>
      <Buttons inputButtons={buttons} />
    </div>
  );
};

export default Tabata;
