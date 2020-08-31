import React from "react";

export enum BUTTON_STATES {
  CHOOSE,
  RESULT,
}

type Props = {
  pair: any;
  onclick: Function;
  state: BUTTON_STATES;
};

export const GameButton = ({ pair, onclick, state }: Props) => {
  const buttonProperties = () => {
    if (state === BUTTON_STATES.CHOOSE) {
      return {
        onClick: () => onclick(pair),
        className: "btn btn-primary btn-lg btn-block btn-game",
      };
    } else if (state === BUTTON_STATES.RESULT) {
      return {
        className: pair.winner
          ? "btn btn-success btn-lg btn-block btn-game btn-game-winner"
          : "btn btn-danger btn-lg btn-block btn-game btn-game-looser",
      };
    }
  };

  return (
    <div className="row align-items-end" id="game-button-div">
      <div className="col-12 text-center">
        <div {...buttonProperties()}>{pair.word}</div>
      </div>
    </div>
  );
};
