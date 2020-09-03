import React from "react";
import { BButton } from "../../../components/BButton";
import "./JoinGameForm.css";

type Props = {
  joinGame: Function;
  gameId: string;
  setGameId: Function;
  nick: string;
  setNick: Function;
};

export const JoinGameForm = ({
  joinGame,
  gameId,
  setGameId,
  nick,
  setNick,
}: Props) => {
  function handleGameId(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.toUpperCase();
    setGameId(value);
  }

  //TODO: Impemet message box

  return (
    <div className="flexbox-parent-middle-top join-game-box">
      <div>
        <div>
          <label htmlFor="gamecode">Enter Game Code</label>
        </div>
        <div>
          <input
            type="text"
            id="gamecode"
            onChange={(e) => {
              handleGameId(e);
            }}
            value={gameId}
            maxLength={5}
          />
        </div>
        <div className="margin-top-20">
          <label htmlFor="nickname">Choose Your Nickname</label>
        </div>
        <div>
          <input
            type="text"
            id="nickname"
            onChange={(e) => {
              setNick(e.target.value);
            }}
            value={nick}
          />
        </div>
      </div>
      <div className="margin-top-20">
        {" "}
        <BButton text="Join Game" onClick={joinGame} />
      </div>
    </div>
  );
};
