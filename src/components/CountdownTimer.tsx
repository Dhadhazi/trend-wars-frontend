import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

type Props = {
  seconds: number;
  trigger: number;
  playing: boolean;
  completeCB: Function;
};

export const CountdownTimer = ({
  seconds,
  trigger,
  playing,
  completeCB,
}: Props) => {
  const renderTime = ({ remainingTime }: any) => {
    return (
      <div className="timer">
        <div className="h1 font-weight-bold">{remainingTime}</div>
      </div>
    );
  };

  return (
    <div className="timer-wrapper margin-top">
      <CountdownCircleTimer
        isPlaying={playing}
        key={trigger}
        onComplete={() => {
          completeCB();
        }}
        duration={seconds}
        size={100}
        colors={[
          ["#004777", 0.33],
          ["#F7B801", 0.33],
          ["#A30000", 0.33],
        ]}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};
