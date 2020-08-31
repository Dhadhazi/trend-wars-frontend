import React, { useState, useEffect } from "react";
import { gql, useSubscription, useMutation } from "@apollo/client";
import { GameButton, BUTTON_STATES } from "../../components/GameButton";
import { CountdownTimer } from "../../components/CountdownTimer";
import { MultiWaitingRoom } from "./components/MultiWaitingRoom";
import { MultiGameResult } from "./components/MultiGameResult";

type Props = {
  gameRoom: GameRoomType;
  nick: string;
  gameDirectorCB: Function;
};

const CHANGE_GAMESTATE = gql`
  mutation changeGameRoomState($gameId: String, $state: Int) {
    changeGameRoomState(gameId: $gameId, state: $state)
  }
`;

const EXIT_GAME = gql`
  mutation exitGameRoom($gameId: String, $nick: String) {
    exitGameRoom(gameId: $gameId, nick: $nick)
  }
`;

const ADD_ANSWER = gql`
  mutation addPlayerAnswer($gameId: String, $nick: String, $winner: Boolean) {
    addPlayerAnswer(gameId: $gameId, nick: $nick, winner: $winner)
  }
`;

const GAMEROOM_SUB = gql`
  subscription GameRoom($gameId: String!) {
    GameRoom(gameId: $gameId) {
      players {
        nick
        points
      }
      answers
      state
    }
  }
`;

export const MultiGame = ({ gameRoom, nick, gameDirectorCB }: Props) => {
  const [gameState, setGameState] = useState<number>(gameRoom.state);
  const [players, setPlayers] = useState<[MultiPlayer]>(gameRoom.players);
  const [answered, setAnswered] = useState<boolean>(false);

  const [changeGameStateMutation] = useMutation(CHANGE_GAMESTATE, {
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  const [addPlayerAnswerMutation] = useMutation(ADD_ANSWER, {
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  const [exitGameMutation] = useMutation(EXIT_GAME, {
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  const numberOfQuestions = gameRoom.gameDeck.pairs.length;

  useSubscription(GAMEROOM_SUB, {
    variables: { gameId: gameRoom.gameId },
    onSubscriptionData: ({ subscriptionData }) => {
      if (
        subscriptionData.data.GameRoom.answers ===
        subscriptionData.data.GameRoom.players.length
      ) {
        if (gameRoom.creator === nick) setTimeout(() => nextState(), 1500);
      }
      if (subscriptionData.data.GameRoom.state === -2) {
        setGameState(subscriptionData.data.GameRoom.state);
      }
      if (gameState + 1 === subscriptionData.data.GameRoom.state) {
        setAnswered(false);
        setGameState(subscriptionData.data.GameRoom.state);
      } else {
        setPlayers(subscriptionData.data.GameRoom.players);
      }
    },
  });

  //If somebody quits it kicks him out of the game
  useEffect(() => {
    const cleanup = () => {
      exitGameMutation({
        variables: {
          gameId: gameRoom.gameId,
          nick,
        },
      });
    };
    window.addEventListener("beforeunload", cleanup);

    window.onbeforeunload = closingCode;
    function closingCode() {
      cleanup();
      return null;
    }
    return () => {
      window.removeEventListener("beforeunload", cleanup);
    };
  }, [exitGameMutation, gameRoom.gameId, nick]);

  //TODO: Investigate why is it called twice
  function nextState() {
    console.log("next state called");
    changeGameStateMutation({
      variables: {
        gameId: gameRoom.gameId,
        state: gameState + 1,
      },
    });
  }

  function playerChoice(choice: PairType) {
    addPlayerAnswerMutation({
      variables: {
        gameId: gameRoom.gameId,
        nick,
        winner: choice.winner,
      },
    });
    setAnswered(true);
  }

  function timerDone() {
    addPlayerAnswerMutation({
      variables: {
        gameId: gameRoom.gameId,
        nick,
        winner: false,
      },
    });
    setAnswered(true);
  }

  if (gameState === -1) {
    return (
      <MultiWaitingRoom
        gameId={gameRoom.gameId}
        players={players}
        creator={nick === gameRoom.creator}
        gameDirectorCB={nextState}
      />
    );
  }

  if (gameState === -2) {
    return (
      <div className="container">
        {" "}
        The game has been cancelled by the creator.
      </div>
    );
  }

  if (gameState === gameRoom.gameDeck.pairs.length) {
    gameRoom.players = players;
    return (
      <MultiGameResult
        gameRoom={gameRoom}
        nick={nick}
        gameDirectorCB={() => {}}
      />
    );
  }
  return (
    <div className="container  text-center">
      <div className="row  gamebox">
        <div className="col-6 text-left">
          <small>
            Total questions: {gameState + 1}/{numberOfQuestions}
            <br />
            {gameRoom.gameDeck.geo}
            <br />
            {gameRoom.gameDeck.dateString}
          </small>
        </div>
        <div className="col-6">
          <div className="d-flex justify-content-end">
            <CountdownTimer
              seconds={gameRoom.gameDeck.timer}
              trigger={gameState}
              playing={!answered}
              completeCB={timerDone}
            />
          </div>
        </div>
        <div className="col-12">
          {answered ? "Waiting for others to answer" : ""}
        </div>
        <div className="col-md-6 choosebox">
          <GameButton
            pair={gameRoom.gameDeck.pairs[gameState][0]}
            onclick={playerChoice}
            state={answered ? BUTTON_STATES.RESULT : BUTTON_STATES.CHOOSE}
          />
        </div>
        <div className="col-md-6 choosebox">
          <GameButton
            pair={gameRoom.gameDeck.pairs[gameState][1]}
            onclick={playerChoice}
            state={answered ? BUTTON_STATES.RESULT : BUTTON_STATES.CHOOSE}
          />
        </div>

        <div className="col-12 text-center margin-top">
          <ul className="list-group">
            {players.map((p: MultiPlayer, i: number) => (
              <li
                key={`pointlis-${i}`}
                className={
                  p.nick === nick ? "list-group-item active" : "list-group-item"
                }
              >
                {p.nick}
                <span className="badge badge-primary badge-pill">
                  {p.points} points
                </span>
              </li>
            ))}
          </ul>
          <small>
            Pick the answer who was the trendiest in {gameRoom.gameDeck.geo}{" "}
            {gameRoom.gameDeck.dateString}
          </small>{" "}
        </div>
        <div className="col-12 text-center margin-top">
          {gameRoom.creator === nick ? (
            <button className="btn btn-lg btn-game" onClick={() => nextState()}>
              {" "}
              Next Question
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
