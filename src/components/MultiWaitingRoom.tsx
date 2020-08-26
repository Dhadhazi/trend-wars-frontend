import React, { useState } from "react";
import { useMutation, gql, useSubscription } from "@apollo/client";

type PairInput = {
  word: String;
  score: Number;
  winner: Boolean;
};

type Player = {
  nick: String;
};

const CREATE_GAMEROOM = gql`
  mutation addGameRoom(
    $creator: String!
    $name: String!
    $description: String!
    $dateString: String!
    $geo: String!
    $timer: Int!
    $pairs: [[PairInput]]
  ) {
    addGameRoom(
      input: {
        creator: $creator
        gameDeck: {
          name: $name
          description: $description
          dateString: $dateString
          geo: $geo
          timer: $timer
          pairs: $pairs
        }
      }
    )
  }
`;

const GAMEROOM_SUB = gql`
  subscription GameRoom($gameId: String!) {
    GameRoom(gameId: $gameId) {
      players {
        nick
      }
    }
  }
`;

type Props = {
  deck: GameDeckType;
  gameDirectorCB: Function;
};

export const MultiWaitingRoom = ({ deck, gameDirectorCB }: Props) => {
  const [nick, setNick] = useState<string>("");
  const [gameId, setGameId] = useState<string>("");

  const [createGameRoomMutation] = useMutation(CREATE_GAMEROOM, {
    onCompleted: (res) => setGameId(res.addGameRoom),
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });
  const subscriptionData = useSubscription(GAMEROOM_SUB, {
    variables: { gameId },
  });

  function nickSubmit() {
    createGameRoomMutation({
      variables: {
        creator: nick,
        name: deck.name,
        description: deck.description,
        dateString: deck.dateString,
        geo: deck.geo,
        pairs: deck.pairs,
        timer: deck.timer,
      },
    });
  }

  if (gameId !== "") {
    if (subscriptionData.loading)
      return (
        <div className="container">
          <div className="text-center">
            {" "}
            <h3>The rooms ID is: {gameId} </h3>
            <div>Waiting for other players... </div>
          </div>
        </div>
      );

    if (subscriptionData.data) {
      const players = subscriptionData.data.GameRoom.players;
      return (
        <div className="container">
          <div className="text-center">
            {" "}
            <h3>The rooms ID is: {gameId} </h3>
            <div className="list-group">Players in the game: </div>
            <ul>
              {players.map((p: Player, i: Number) => (
                <li key={`player-${i}`} className="list-group-item">
                  {p.nick}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8 text-center margin-top">
          <h4>Choose your nickname:</h4>
          <input
            className="form-control form-control-lg margin-top"
            type="text"
            placeholder="Your nickname"
            onChange={(e) => setNick(e.target.value)}
            value={nick}
          />
          <button
            type="button"
            className="btn btn-primary btn-lg margin-top"
            onClick={() => nickSubmit()}
          >
            Submit
          </button>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
};
