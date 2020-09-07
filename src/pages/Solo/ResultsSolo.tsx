import React from "react";
import { BButton } from "../../components/BButton";
import "./ResultsSolo.css";
import Fade from "../../animations/Fade";

type Props = {
  playerScore: number;
  gameDeck: GameDeckType;
  gameDirectorCB: Function;
};

export const ResultsSolo = ({
  playerScore,
  gameDeck,
  gameDirectorCB,
}: Props) => {
  return (
    <Fade>
      <div className="flexbox-parent-middle-top flex-direction-column">
        <div id="results-title">
          Congratulations, you got {playerScore} right from{" "}
          {gameDeck.pairs.length} questions right!
        </div>
        <div id="results-deckname">{gameDeck.name}</div>
        <div id="results-info">
          Date: {gameDeck.dateString}
          <br />
          Territory: {gameDeck.geo}
        </div>
        <div id="results-solo-buttons">
          <BButton text="Replay!" onClick={() => gameDirectorCB(true)} />
          <BButton text="New Game" onClick={() => gameDirectorCB(false)} />
        </div>
      </div>
    </Fade>
  );
};
