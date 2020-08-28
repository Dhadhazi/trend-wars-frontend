import React, { useState } from "react";
import { gql, useSubscription, useMutation } from "@apollo/client";
import { GameButton, BUTTON_STATES } from "./GameButton";
import { CountdownTimer } from "./CountdownTimer";
import { MultiWaitingRoom } from "./MultiWaitingRoom";
import { MultiGameResult } from "./MultiGameResult";

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

  const numberOfQuestions = gameRoom.gameDeck.pairs.length;

  useSubscription(GAMEROOM_SUB, {
    variables: { gameId: gameRoom.gameId },
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData.data.GameRoom);
      if (
        subscriptionData.data.GameRoom.answers ===
        subscriptionData.data.GameRoom.players.length
      ) {
        setTimeout(() => nextState(), 1500);
      }
      if (gameState + 1 === subscriptionData.data.GameRoom.state) {
        setAnswered(false);
        setGameState(subscriptionData.data.GameRoom.state);
      } else {
        setPlayers(subscriptionData.data.GameRoom.players);
      }
    },
  });

  /*Increase gameState by one, if it's equal to pairs.length show results screen*/
  async function nextState() {
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
    console.log("timeout");
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

  if (gameState + 1 === gameRoom.gameDeck.pairs.length) {
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
