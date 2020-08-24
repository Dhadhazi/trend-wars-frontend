import React, { useState, useEffect } from "react";
import { GameButton, BUTTON_STATES } from "./GameButton";
import { ProgressBar } from "./ProgressBar";

type Props = {
  deck: GameDeckType;
  gameDirectorCB: Function;
};

export const SoloGame = ({ deck, gameDirectorCB }: Props) => {
  const [gameState, setGameState] = useState<number>(-1);

  const [playerScore, setPlayerScore] = useState<number>(0);

  const [buttonState, setButtonState] = useState<BUTTON_STATES>(
    BUTTON_STATES.CHOOSE
  );
  const numberOfQuestions = deck.pairs.length;

  function gameMaster() {
    if (gameState === deck.pairs.length - 1) {
      gameDirectorCB(playerScore);
    } else {
      setGameState((prevState) => prevState + 1);
      setButtonState(BUTTON_STATES.CHOOSE);
    }
  }

  function playerChoice(choice: PairType) {
    if (choice.winner) setPlayerScore((prevScore) => prevScore + 1);
    setButtonState(BUTTON_STATES.RESULT);
    setTimeout(() => gameMaster(), 1000);
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
        <div className="col-12 text-left">
          <small>
            Total questions: {gameState + 1}/{numberOfQuestions}
            <br />
            {deck.geo}
            <br />
            {deck.dateString}
          </small>
        </div>
        <div className="col-md-6 choosebox">
          <GameButton
            pair={deck.pairs[gameState][0]}
            onclick={playerChoice}
            state={buttonState}
          />
        </div>
        <div className="col-md-6 choosebox">
          <GameButton
            pair={deck.pairs[gameState][1]}
            onclick={playerChoice}
            state={buttonState}
          />
        </div>

        <div className="col-2"></div>
        <div className="col-8 margin-top">
          <ProgressBar />
        </div>
        <div className="col-2"></div>
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
