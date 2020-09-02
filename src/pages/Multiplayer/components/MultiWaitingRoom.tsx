import React from "react";
import "./MultiWaitingRoom.css";
import { BButton } from "../../../components/BButton";
import { TrendWarsLogo } from "../../../components/TrendWarsLogo";

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
    <div className="flexbox-parent-middle-top flex-direction-column">
      <TrendWarsLogo />
      <div id="waitingroom-roomid">The rooms ID is: {gameId} </div>
      <div id="waitingroom-playerlist-title">Players in the game: </div>
      <ul id="waitingroom-playerlist">
        {players.map((p: MultiPlayer, i: Number) => (
          <li key={`player-${i}`}>{p.nick}</li>
        ))}
      </ul>
      <div id="waitingroom-startbutton">
        {creator ? (
          <BButton text="Start the game!" onClick={() => gameDirectorCB()} />
        ) : (
          "Waiting for the creator to start the game..."
        )}
      </div>
    </div>
  );
};
