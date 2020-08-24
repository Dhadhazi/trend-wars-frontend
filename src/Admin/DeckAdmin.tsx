import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_DECKS = gql`
  query getDecks {
    decks {
      _id
      name
      description
      keywords
    }
  }
`;

const DELETE_DECK = gql`
  mutation deleteDeck($id: ID!) {
    deleteDeck(_id: $id)
  }
`;

type DeckType = {
  _id: string;
  name: string;
  description: string;
  keywords: Array<string>;
};

export const DeckAdmin = () => {
  const [selectedDeck, setSelectedDeck] = useState<string>("");
  const [deleteButton, setDeleteButton] = useState<boolean>(false);

  const [deleteDeckMutation] = useMutation(DELETE_DECK, {
    onCompleted: () => console.log("success"),
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  function deleteDeck(id: string) {
    setDeleteButton(false);
    deleteDeckMutation({ variables: { id } });
  }

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
            {data.decks.map((deck: DeckType, i: number) => {
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
                <h4>Keywords:</h4>
                <ul className="list-group list-group-flush">
                  {data.decks[selectedDeck].keywords.map(
                    (word: string, i: number) => {
                      return (
                        <li className="list-group-item" key={`keyword-${i}`}>
                          {word}
                        </li>
                      );
                    }
                  )}
                </ul>
                {deleteButton ? (
                  <button
                    type="button"
                    className="btn btn-danger btn-lg btn-block"
                    onClick={() => deleteDeck(data.decks[selectedDeck]._id)}
                    onBlur={() => setDeleteButton(false)}
                  >
                    Are you sure you want to delete?
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-danger btn-lg btn-block"
                    onClick={() => setDeleteButton(true)}
                  >
                    Delete Deck
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
