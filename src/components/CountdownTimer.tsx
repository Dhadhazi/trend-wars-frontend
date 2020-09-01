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
    return <div id="timer-inside">{remainingTime}</div>;
  };

  return (
    <div id="timer-wrapper">
      <CountdownCircleTimer
        isPlaying={playing}
        key={trigger}
        onComplete={() => {
          completeCB();
        }}
        duration={seconds}
        size={100}
        colors={[
          ["#3498DB", 0.33],

          ["#E74C3C", 0.2],
        ]}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};
