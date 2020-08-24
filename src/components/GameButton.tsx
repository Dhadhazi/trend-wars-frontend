import React from "react";
import { useSpring, animated } from "react-spring";

export enum BUTTON_STATES {
  CHOOSE,
  RESULT,
}

type PairType = {
  word: string;
  score: number;
  winner: boolean;
};

type Props = {
  pair: any;
  onclick: Function;
  state: BUTTON_STATES;
};

export const GameButton = ({ pair, onclick, state }: Props) => {
  const resultsAnimation = useSpring({
    config: { duration: 650 },
    height: 46 + pair.score,
    from: { height: 46 },
  });

  const buttonProperties = () => {
    if (state === BUTTON_STATES.CHOOSE) {
      return {
        onClick: () => onclick(pair),
        className: "btn btn-primary btn-lg btn-block btn-game",
      };
    } else if (state === BUTTON_STATES.RESULT) {
      return {
        className: pair.winner
          ? "btn btn-success btn-lg btn-block btn-game"
          : "btn btn-danger btn-lg btn-block btn-game",
        style: resultsAnimation,
      };
    }
  };

  return (
    <div className="row align-items-end" id="game-button-div">
      <div className="col-12 text-center">
        <animated.button {...buttonProperties()}>{pair.word}</animated.button>
      </div>
    </div>
  );
};
