import React from "react";

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
    <div className="container">
      <h1>
        Congratulations, you got {playerScore} right from{" "}
        {gameDeck.pairs.length} questions right!
      </h1>
      <h3>{gameDeck.name}</h3>
      <h4>{gameDeck.dateString}</h4>
      <h5>{gameDeck.geo}</h5>
      <button
        className="btn btn-outline-primary btn-lg"
        onClick={() => {
          gameDirectorCB(true);
        }}
        style={{ margin: "10px" }}
      >
        Replay!
      </button>
      <button
        className="btn btn-outline-success btn-lg"
        onClick={() => {
          gameDirectorCB(false);
        }}
        style={{ margin: "10px" }}
      >
        New game
      </button>
    </div>
  );
};
