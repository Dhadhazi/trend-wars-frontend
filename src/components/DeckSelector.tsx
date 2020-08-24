import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_DECKS = gql`
  query getDecks {
    decks {
      _id
      name
      description
    }
  }
`;

type Props = {
  select: Function;
};

export const DeckSelector = ({ select }: Props) => {
  const [selectedDeck, setSelectedDeck] = useState<string>("");

  const { loading, error, data } = useQuery(GET_DECKS);

  if (loading) {
    return (
      <progress className="progress is-large is-info" max="100">
        60%
      </progress>
    );
  }
  if (error) {
    return <div>Error, can't get the decks</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-5">
          <ul className="list-group">
            {data.decks.map((deck: GameDeckType, i: number) => {
              return (
                <button
                  key={`${i}`}
                  className="list-group-item list-group-item-action"
                  onClick={() => setSelectedDeck(i.toString())}
                >
                  {deck.name}
                </button>
              );
            })}
          </ul>
        </div>
        <div className="col-7">
          {selectedDeck === "" ? (
            "Please select a deck!"
          ) : (
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center">
                  {data.decks[selectedDeck].name}
                </h3>
                <p className="card-text text-center">
                  {data.decks[selectedDeck].description}
                </p>
                <button
                  className="btn btn-lg btn-block btn-dark"
                  onClick={() => select(data.decks[selectedDeck]._id)}
                >
                  Select Deck
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
