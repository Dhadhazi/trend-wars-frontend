import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { JoinGameForm } from "./components/JoinGameForm";

const JOIN_GAME = gql`
  mutation joinGameRoom($gameId: String!, $nick: String!) {
    joinGameRoom(gameId: $gameId, nick: $nick) {
      gameDeck {
        name
        description
        dateString
        geo
        timer
        pairs {
          word
          score
          winner
        }
      }
      players {
        nick
        points
      }
      gameId
      answers
      state
    }
  }
`;

const NICK_EXISTS = gql`
  mutation nickExistsCheck($gameId: String!, $nick: String!) {
    nickExistsCheck(gameId: $gameId, nick: $nick)
  }
`;

type Props = {
  gameDirectorCB: Function;
};

export const JoinGame = ({ gameDirectorCB }: Props) => {
  const [gameId, setGameId] = useState<string>("");
  const [nick, setNick] = useState<string>("");

  const [nickExistsMutation] = useMutation(NICK_EXISTS, {
    onCompleted: (res) => {
      if (res.nickExistsCheck === null) {
        console.log("Room does not exists");
      } else if (res.nickExistsCheck) {
        console.log("Nick already taken");
      } else {
        joinGameMutation({
          variables: {
            gameId: gameId,
            nick: nick,
          },
        });
      }
    },
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  const [joinGameMutation] = useMutation(JOIN_GAME, {
    onCompleted: (res) => {
      if (res.joinGameRoom === null) {
        console.log("no such room");
      } else {
        gameDirectorCB(res.joinGameRoom, nick);
      }
    },
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  function joinGame() {
    nickExistsMutation({
      variables: {
        gameId: gameId,
        nick: nick,
      },
    });
  }

  return (
    <JoinGameForm
      joinGame={joinGame}
      nick={nick}
      setNick={setNick}
      gameId={gameId}
      setGameId={setGameId}
    />
  );
};
