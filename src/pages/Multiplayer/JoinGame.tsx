import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";

import { JoinGameForm } from "./components/JoinGameForm";
import { showMessageWithTimeout } from "../../store/appState/actions";

import Fade from "../../animations/Fade";

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
  mutation nickExistsOrFullCheck($gameId: String!, $nick: String!) {
    nickExistsOrFullCheck(gameId: $gameId, nick: $nick)
  }
`;

type Props = {
  gameDirectorCB: Function;
};

export const JoinGame = ({ gameDirectorCB }: Props) => {
  const [gameId, setGameId] = useState<string>("");
  const [nick, setNick] = useState<string>("");

  const dispatch = useDispatch();

  const [nickExistsOrFullMutation] = useMutation(NICK_EXISTS, {
    onCompleted: (res) => {
      console.log(res.nickExistsOrFullCheck);
      if (res.nickExistsOrFullCheck === 0) {
        dispatch(
          showMessageWithTimeout("danger", "Game doesn't exist under this code")
        );
      } else if (res.nickExistsOrFullCheck === 1) {
        dispatch(showMessageWithTimeout("danger", "Nickname already taken"));
      } else if (res.nickExistsOrFullCheck === 2) {
        dispatch(showMessageWithTimeout("danger", "Game is full"));
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
        dispatch(showMessageWithTimeout("danger", "Game doesn't exist"));
      } else {
        gameDirectorCB(res.joinGameRoom, nick);
      }
    },
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  function joinGame() {
    nickExistsOrFullMutation({
      variables: {
        gameId: gameId,
        nick: nick,
      },
    });
  }

  return (
    <Fade>
      <JoinGameForm
        joinGame={joinGame}
        nick={nick}
        setNick={setNick}
        gameId={gameId}
        setGameId={setGameId}
      />
    </Fade>
  );
};
