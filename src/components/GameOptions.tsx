import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { countryStringMaker } from "../Admin/CountryCodes";
import { GAME_MODES } from "./GameDirector";
import moment from "moment";

const GET_DECK = gql`
  query deckById($id: ID!) {
    deckById(_id: $id) {
      name
      description
      start_date
      end_date
      geo
      pairs {
        word
        winner
        score
      }
    }
  }
`;

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

type Props = {
  id: string;
  gameDirectorCB: Function;
};

export const GameOptions = ({ id, gameDirectorCB }: Props) => {
  const { loading, error, data } = useQuery(GET_DECK, { variables: { id } });
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(4);
  const [seconds, setSeconds] = useState<number>(5);
  const [nick, setNick] = useState<string>("");
  const [gameMode, setGameMode] = useState<GAME_MODES>(GAME_MODES.SOLO_PAIRS);

  function pickGameQuestions() {
    let allQuestions = [...data.deckById.pairs];
    let questions: Array<Array<PairType>> = [];
    for (let i = 0; i < numberOfQuestions; i++) {
      const randomQuestionNumber = Math.floor(
        Math.random() * allQuestions.length
      );
      questions = [...questions, allQuestions[randomQuestionNumber]];
      allQuestions.splice(randomQuestionNumber, 1);
    }
    return questions;
  }
  //TODO: IF nick empty do not accept form!

  const [createGameRoomMutation] = useMutation(CREATE_GAMEROOM, {
    onCompleted: (res) => {
      return res.addGameRoom;
    },
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  async function startGame() {
    const questions = pickGameQuestions();
    const dateString = `From ${moment(data.deckById.start_date).format(
      "ll"
    )} until ${moment(data.deckById.end_date).format("ll")}`;
    const gameDeck = {
      _id: id,
      name: data.deckById.name,
      description: data.deckById.description,
      dateString,
      geo: countryStringMaker(data.deckById.geo),
      pairs: questions,
      timer: seconds,
      gameMode,
    };

    if (gameMode === GAME_MODES.MULTI_PAIRS) {
      const gameId = await createGameRoomMutation({
        variables: {
          creator: nick,
          name: gameDeck.name,
          description: gameDeck.description,
          dateString: gameDeck.dateString,
          geo: gameDeck.geo,
          pairs: gameDeck.pairs,
          timer: gameDeck.timer,
        },
      });
      const gameRoom = {
        gameId: gameId.data.addGameRoom,
        creator: nick,
        answers: 0,
        state: -1,
        gameDeck: { ...gameDeck },
        players: [{ nick, points: 0 }],
      };
      gameDirectorCB(gameRoom, nick);
    } else {
      const gameRoom = {
        gameDeck: { ...gameDeck },
      };
      gameDirectorCB(gameRoom);
    }
  }

  if (loading) {
    return <div>LOADING</div>;
  }

  if (error) {
    console.log("ERROR");
    return <div>ERROR</div>;
  }

  if (data) {
    const {
      name,
      description,
      start_date,
      end_date,
      geo,
      pairs,
    } = data.deckById;
    return (
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8 text-center">
            <h2>{name}</h2>
            <h5>{description}</h5>
            <h6> There are {pairs.length} questions in this deck.</h6>
            <h6>
              Date Range: {start_date} until {end_date}
            </h6>
            <h6>Countries: {countryStringMaker(geo)}</h6>
            <h2>Options</h2>

            <div className="form-group">
              <label htmlFor="formControlRange" className="h3">
                Number of questions in the game: {numberOfQuestions}
              </label>
              <input
                type="range"
                className="form-control-range"
                id="formControlRange"
                max={pairs.length}
                min={3}
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
              />
              <br />
              <label htmlFor="formControlRange" className="h3">
                How many seconds to answer a question: {seconds}
              </label>
              <input
                type="range"
                className="form-control-range"
                id="formControlRange"
                max={10}
                min={2}
                value={seconds}
                onChange={(e) => setSeconds(Number(e.target.value))}
              />
            </div>
            <div className="form-check form-check-inline margin-top">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="solo"
                value="solo"
                defaultChecked
                onClick={() => setGameMode(GAME_MODES.SOLO_PAIRS)}
              />
              <label className="form-check-label" htmlFor="solo">
                Solo Game
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="multi"
                value="multi"
                onClick={() => setGameMode(GAME_MODES.MULTI_PAIRS)}
              />
              <label className="form-check-label" htmlFor="multi">
                Multiplayer Game
              </label>
            </div>
            {gameMode === GAME_MODES.MULTI_PAIRS ? (
              <div>
                Choose your nickname:{" "}
                <input
                  className="form-control form-control-lg margin-top"
                  type="text"
                  placeholder="Your nickname"
                  onChange={(e) => setNick(e.target.value)}
                  value={nick}
                />
              </div>
            ) : (
              ""
            )}

            <button
              className="btn btn-lg btn-secondary margin-top"
              onClick={() => startGame()}
            >
              Start Game
            </button>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <h1>LOADING</h1>
      </div>
    </div>
  );
};
