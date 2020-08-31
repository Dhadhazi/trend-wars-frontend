import React, { useState, useEffect } from "react";
import { GameButton, BUTTON_STATES } from "../../components/GameButton";
import { CountdownTimer } from "../../components/CountdownTimer";

type Props = {
  deck: GameDeckType;
  gameDirectorCB: Function;
};

//Setting playerscore counter here, so it won't rerender
let playerScore = 0;

export const SoloGame = ({ deck, gameDirectorCB }: Props) => {
  const [gameState, setGameState] = useState<number>(-1);

  const [buttonState, setButtonState] = useState<BUTTON_STATES>(
    BUTTON_STATES.CHOOSE
  );
  const numberOfQuestions = deck.pairs.length;

  function gameMaster() {
    if (gameState === numberOfQuestions - 1) {
      gameDirectorCB(playerScore);
      playerScore = 0;
    } else {
      setGameState((prevState) => prevState + 1);
      setButtonState(BUTTON_STATES.CHOOSE);
    }
  }

  function playerChoice(choice: PairType) {
    if (choice.winner) {
      playerScore++;
    }
    setButtonState(BUTTON_STATES.RESULT);
    setTimeout(() => gameMaster(), 1500);
  }

  function timerDone() {
    setButtonState(BUTTON_STATES.RESULT);
    setTimeout(() => gameMaster(), 1500);
  }

  useEffect(() => {
    setGameState(0);
    setButtonState(BUTTON_STATES.CHOOSE);
  }, []);

  if (gameState === -1) {
    return <div>Setting up the game</div>;
  }

  return (
    <div className="container  text-center">
      <div className="row  gamebox">
        <div className="col-6 text-left">
          <small>
            Total questions: {gameState + 1}/{numberOfQuestions}
            <br />
            {deck.geo}
            <br />
            {deck.dateString}
          </small>
        </div>
        <div className="col-6">
          <div className="d-flex justify-content-end">
            <CountdownTimer
              seconds={deck.timer}
              trigger={gameState}
              playing={buttonState === BUTTON_STATES.CHOOSE ? true : false}
              completeCB={timerDone}
            />
          </div>
        </div>
        <div className="col-6 choosebox">
          <GameButton
            pair={deck.pairs[gameState][0]}
            onclick={playerChoice}
            state={buttonState}
          />
        </div>
        <div className="col-6 choosebox">
          <GameButton
            pair={deck.pairs[gameState][1]}
            onclick={playerChoice}
            state={buttonState}
          />
        </div>

        <div className="col-12 text-center margin-top">
          Your score: {playerScore}
          <br />
          <br />
          <small>
            Pick the answer who was the trendiest in {deck.geo}{" "}
            {deck.dateString}
          </small>{" "}
        </div>
      </div>
    </div>
  );
};
