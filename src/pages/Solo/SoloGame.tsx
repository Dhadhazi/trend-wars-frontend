import React, { useState, useEffect } from "react";
import { BUTTON_STATES } from "../../components/GameButton";
import { GamePlay } from "../../components/GamePlay";

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
    <GamePlay
      gameState={gameState}
      deck={deck}
      timerDone={timerDone}
      buttonState={buttonState}
      playerChoice={playerChoice}
    />
  );
};
