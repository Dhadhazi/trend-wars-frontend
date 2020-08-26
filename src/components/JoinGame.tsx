import React, { useState, FormEvent } from "react";
import { useMutation, gql } from "@apollo/client";

const JOIN_GAME = gql`
  mutation joinGameRoom($gameId: String!, $nick: String!) {
    joinGameRoom(gameId: $gameId, nick: $nick) {
      gameDeck {
        name
      }
    }
  }
`;

export const JoinGame = () => {
  const [gameId, setGameId] = useState<string>("");
  const [nick, setNick] = useState<string>("");

  const [joinGameMutation] = useMutation(JOIN_GAME, {
    onCompleted: (res) => console.log("Joined, yeey!"),
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  function handleGameId(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.toUpperCase();
    setGameId(value);
  }

  function joinGame() {
    joinGameMutation({
      variables: {
        gameId: gameId,
        nick: nick,
      },
    });
  }

  return (
    <div className="container">
      <div className="form-group">
        <label htmlFor="gamecode">Game Code</label>
        <input
          type="text"
          className="form-control"
          id="gamecode"
          onChange={(e) => {
            handleGameId(e);
          }}
          value={gameId}
          maxLength={5}
        />
        <small id="gamecodehelp" className="form-text text-muted">
          Enter the code for the game, you can get it from the game creator
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="nickname">Nick</label>
        <input
          type="text"
          className="form-control"
          id="nickname"
          onChange={(e) => {
            setNick(e.target.value);
          }}
          value={nick}
        />
      </div>
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          I agree to terms and conditions, which I wouldn't read anyway, so the
          developer didn't write it
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => joinGame()}
      >
        Join
      </button>
    </div>
  );
};
