import React from "react";
import { CountdownTimer } from "./CountdownTimer";
import { GameButton, BUTTON_STATES } from "./GameButton";
import "./GamePlay.css";
import { TrendWarsLogo } from "./TrendWarsLogo";

type Props = {
  gameState: number;
  deck: GameDeckType;
  timerDone: Function;
  buttonState: BUTTON_STATES;
  playerChoice: Function;
};

export const GamePlay = ({
  gameState,
  deck,
  timerDone,
  buttonState,
  playerChoice,
}: Props) => {
  const numberOfQuestions = deck.pairs.length;

  return (
    <div className="flexbox-parent-middle-top flex-direction-column">
      <TrendWarsLogo />
      <div id="gameplay-grid">
        <div id="gameinfo">
          Total questions: {gameState + 1}/{numberOfQuestions}
          <br />
          {deck.geo}
          <br />
          {deck.dateString}
        </div>
        <div id="clock">
          <CountdownTimer
            seconds={deck.timer}
            trigger={gameState}
            playing={buttonState === BUTTON_STATES.CHOOSE ? true : false}
            completeCB={timerDone}
          />
        </div>
        <div id="gamebuttons">
          <GameButton
            pair={deck.pairs[gameState][0]}
            onclick={playerChoice}
            state={buttonState}
          />
          <GameButton
            pair={deck.pairs[gameState][1]}
            onclick={playerChoice}
            state={buttonState}
          />
        </div>

        <div id="bottomtext">
          Choose which keyword was trending more in {deck.geo} {deck.dateString}
        </div>
      </div>
    </div>
  );
};
