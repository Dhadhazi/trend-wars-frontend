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

const scaleAnimation = (scaleTo: number) => {
  if (scaleTo !== 1) {
    return keyframes`
0% {
  opacity: 1;
  transform: scale(1.0);
}

50% {
  opacity: 1;
}

90% {
  opacity: 0;
  transform: scale(${scaleTo});

}
`;
  } else {
    return keyframes`
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    
    to {
      transform: scale(1.0);
      opacity: 1;

    }
    `;
  }
};

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
  animation: ${(props) => scaleAnimation(props.scaleTo)} linear forwards;
  animation-duration: ${(props) =>
    props.state === BUTTON_STATES.RESULT ? "2s" : "0.5s"};

  :hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.state === BUTTON_STATES.CHOOSE ? "#2980b9" : ""};
    color: ${(props) =>
      props.state === BUTTON_STATES.CHOOSE ? "#ecf0f1" : ""};
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.5);
  }

  :active {
    outline: none;
    transform: ${(props) =>
      props.state === BUTTON_STATES.CHOOSE ? "scale(0.98)" : ""};
    background-color: ${(props) =>
      props.state === BUTTON_STATES.CHOOSE ? "#2980b9" : ""};
    color: ${(props) =>
      props.state === BUTTON_STATES.CHOOSE ? "#ecf0f1" : ""};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  :focus {
    outline: none;
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
