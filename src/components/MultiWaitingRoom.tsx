import React from "react";

type Props = {
  gameId: string;
  players: [MultiPlayer];
  creator: boolean;
  gameDirectorCB: Function;
};

export const MultiWaitingRoom = ({
  gameId,
  players,
  creator,
  gameDirectorCB,
}: Props) => {
  return (
    <div className="container">
      <div className="text-center">
        {" "}
        <h3>The rooms ID is: {gameId} </h3>
        <div className="list-group">Players in the game: </div>
        <ul>
          {players.map((p: MultiPlayer, i: Number) => (
            <li key={`player-${i}`} className="list-group-item">
              {p.nick}
            </li>
          ))}
        </ul>
        <div className="text-center">
          {creator ? (
            <button
              className="btn btn-primary btn-lg"
              onClick={() => gameDirectorCB()}
            >
              Start the game!
            </button>
          ) : (
            "Waiting for the creator to start the game"
          )}
        </div>
      </div>
    </div>
  );
};
