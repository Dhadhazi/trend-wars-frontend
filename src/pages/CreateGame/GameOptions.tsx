import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { countryStringMaker } from "../../constants/CountryCodes";
import { GAME_MODES } from "../../components/GameDirector";
import moment from "moment";
import { BButton } from "../../components/BButton";
import "./GameOptions.css";
import { NormalButton } from "../../components/NormalButton";

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
      <div className="flexbox-parent-middle-top flex-direction-column">
        <div className="">
          <h2>{name}</h2>
          <div id="deck-select-info">
            <div>{description}</div>
            There are {pairs.length} questions in this deck.
            <br />
            Date Range: {start_date} until {end_date}
            <br />
            Countries: {countryStringMaker(geo)}
          </div>

          <div id="slider-div">
            <label htmlFor="formControlRange" className="slider-label">
              Number of questions in the game: <h5>{numberOfQuestions}</h5>
            </label>
            <input
              type="range"
              className="deck-selector-slider"
              id="formControlRange"
              max={pairs.length}
              min={3}
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
            />
            <br />
            <label htmlFor="formControlRange" className="slider-label">
              How many seconds to answer a question: <h5> {seconds}</h5>
            </label>
            <input
              type="range"
              className="deck-selector-slider"
              id="formControlRange"
              max={10}
              min={2}
              value={seconds}
              onChange={(e) => setSeconds(Number(e.target.value))}
            />
          </div>

          <div id="gametype-select-box">
            <NormalButton
              text="Solo Game"
              onClick={() => setGameMode(GAME_MODES.SOLO_PAIRS)}
              selected={gameMode === GAME_MODES.SOLO_PAIRS}
            />

            <NormalButton
              text="Multiplayer Game"
              onClick={() => setGameMode(GAME_MODES.MULTI_PAIRS)}
              selected={gameMode === GAME_MODES.MULTI_PAIRS}
            />
          </div>

          {gameMode === GAME_MODES.MULTI_PAIRS ? (
            <div id="nickname-box">
              Choose your nickname:{" "}
              <input
                id="nickname-input"
                type="text"
                placeholder="Your nickname"
                onChange={(e) => setNick(e.target.value)}
                value={nick}
              />
            </div>
          ) : (
            ""
          )}
          <div id="start-game-button">
            <BButton
              text="Start Game"
              onClick={startGame}
              disable={
                nick.length === 0 && gameMode === GAME_MODES.MULTI_PAIRS
                  ? true
                  : false
              }
            />
          </div>
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
