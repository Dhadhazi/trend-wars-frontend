import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Loading } from "../../../components/Loading";
import { EditDeckDisplay } from "./EditDeckDisplay";

const GET_DECKS = gql`
  query decks {
    decks {
      _id
      name
      description
    }
  }
`;

const DELETE_DECK = gql`
  mutation deleteDeck($id: ID!) {
    deleteDeck(_id: $id)
  }
`;

const EDIT_DECK = gql`
  mutation editDeck($_id: String, $name: String, $description: String) {
    editDeck(deck: { _id: $_id, name: $name, description: $description })
  }
`;

type EditDeckForm = {
  _id: string;
  name: string;
  description: string;
};

export const EditDeck = () => {
  const { loading, error, data } = useQuery(GET_DECKS);
  const [selectedDeck, setSelectedDeck] = useState<EditDeckForm>();
  const [deckSubbed, setDeckSubbed] = useState<boolean>(false);

  const [editDeckMutation] = useMutation(EDIT_DECK, {
    onCompleted: () => {
      setDeckSubbed(false);
    },
    onError: (error: any) => {
      console.log("error", error?.networkError?.result);
      setDeckSubbed(true);
    },
    errorPolicy: "all",
  });

  const [deleteDeckMutation] = useMutation(DELETE_DECK, {
    onCompleted: () => console.log("success"),
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  function editDeck(deck: EditDeckForm) {
    editDeckMutation({
      variables: {
        _id: deck._id,
        name: deck.name,
        description: deck.description,
      },
    });
    setDeckSubbed(true);
  }

  function deleteDeck(id: string) {
    deleteDeckMutation({ variables: { id } });
  }

  if (deckSubbed) {
    return (
      <div className="flexbox-parent-middle-top">
        Deck has been submitted, editing/deleting...
        <Loading />
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }
  if (error) {
    console.log("ERROR");
    return <div>ERROR</div>;
  }

  if (data) {
    return (
      <div>
        <div id="approve-deck-list-div">
          {data.decks.map((deck: EditDeckForm, i: number) => (
            <button
              className="deck-listitem-btn"
              key={`decklist-${i}`}
              onClick={() => setSelectedDeck(deck)}
            >
              {deck.name}
            </button>
          ))}
        </div>
        <div className="selected-deck">
          {selectedDeck ? (
            <EditDeckDisplay
              deck={selectedDeck}
              deleteCB={deleteDeck}
              editCB={editDeck}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }

  return <Loading />;
};
