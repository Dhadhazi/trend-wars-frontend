import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { countryStringMaker } from "../Admin/CountryCodes";
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
    const dateString = `From ${moment(data.start_date).format(
      "ll"
    )} until ${moment(data.end_date).format("ll")}`;
    const gameDeck = {
      _id: id,
      name: data.deckById.name,
      description: data.deckById.description,
      dateString,
      geo: countryStringMaker(data.deckById.geo),
      pairs: questions,
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
              </div>
            </form>
            <button className="btn btn-lg" onClick={() => startGame()}>
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
