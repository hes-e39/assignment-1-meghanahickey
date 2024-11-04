// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

type TimerState = {
  minutes: number;
  seconds: number;
  rounds?: number;
};

const calculateSeconds = (timerState: TimerState) => {
    return timerState.minutes * 60 + timerState.seconds;
}

export {calculateSeconds};