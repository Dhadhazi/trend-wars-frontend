import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
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

type Props = {
  id: string;
  gameDirectorCB: Function;
};

export const GameOptions = ({ id, gameDirectorCB }: Props) => {
  const { loading, error, data } = useQuery(GET_DECK, { variables: { id } });
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(4);
  const [seconds, setSeconds] = useState<number>(5);
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

  function startGame() {
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
    gameDirectorCB(gameDeck);
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
            <form>
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
            </form>
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
