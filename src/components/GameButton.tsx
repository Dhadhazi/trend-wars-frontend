import React from "react";

import styled, { keyframes } from "styled-components";

export enum BUTTON_STATES {
  CHOOSE,
  RESULT,
}

type Props = {
  pair: PairType;
  onclick: Function;
  state: BUTTON_STATES;
};

const scaleAnimation = (scaleTo: number) => keyframes`
from {
  transform: scale(1.0);
}

to {
  transform: scale(${scaleTo})
}
`;

const GButton = styled.button<{
  state: BUTTON_STATES;
  winner: boolean;
  scaleTo: number;
}>`
  width: 325px;
  height: 75px;
  background-color: ${(props) =>
    props.state === BUTTON_STATES.CHOOSE
      ? "#3498db"
      : props.winner
      ? "#1CEB56"
      : "#E74C3C"};
  color: ${(props) =>
    props.state === BUTTON_STATES.RESULT
      ? props.winner
        ? "#ecf0f1"
        : "#2c3e50"
      : "#2c3e50"};
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-style: normal;
  font-size: 24px;
  text-align: center;
  margin: 10px;
  animation: ${(props) => scaleAnimation(props.scaleTo)} 2s linear forwards;

  :hover {
    background-color: ${(props) =>
      props.state === BUTTON_STATES.CHOOSE ? "#2980b9" : ""};
    color: ${(props) =>
      props.state === BUTTON_STATES.CHOOSE ? "#ecf0f1" : ""};
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.5);
  }

  :active,
  :focus {
    outline: none;
    transform: ${(props) =>
      props.state === BUTTON_STATES.CHOOSE ? "scale(0.98)" : ""};
    background-color: ${(props) =>
      props.state === BUTTON_STATES.CHOOSE ? "#2980b9" : ""};
    color: ${(props) =>
      props.state === BUTTON_STATES.CHOOSE ? "#ecf0f1" : ""};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

export const GameButton = ({ pair, onclick, state }: Props) => {
  return (
    <GButton
      state={state}
      winner={pair.winner}
      scaleTo={state === BUTTON_STATES.CHOOSE ? 1.0 : pair.winner ? 1.1 : 0.9}
      onClick={() => onclick(pair)}
    >
      {pair.word}
    </GButton>
  );
};
