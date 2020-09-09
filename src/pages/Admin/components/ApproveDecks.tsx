import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Loading } from "../../../components/Loading";
import { ApproveDeckDisplay } from "./DeckDisplay";

type DeckForm = {
  _id: string;
  name: string;
  description: string;
  keywords: Array<string>;
  start_date: string;
  end_date: string;
  category: string | number;
  geo: Array<string>;
  approved: Boolean;
};

const GET_DECKS = gql`
  query decksUnapproved {
    decksUnapproved {
      _id
      name
      description
      keywords
      start_date
      end_date
      category
      geo
      approved
    }
  }
`;

const APPROVE_DECK = gql`
  mutation approveDeck(
    $_id: String
    $name: String
    $description: String
    $keywords: [String]
    $start_date: String
    $end_date: String
    $category: Int
    $geo: [String]
  ) {
    approveDeck(
      deck: {
        _id: $_id
        name: $name
        description: $description
        keywords: $keywords
        start_date: $start_date
        end_date: $end_date
        category: $category
        geo: $geo
      }
    )
  }
`;

const DELETE_DECK = gql`
  mutation deleteDeck($id: ID!) {
    deleteDeck(_id: $id)
  }
`;

export const ApproveDecks = () => {
  const { loading, error, data } = useQuery(GET_DECKS);
  const [selectedDeck, setSelectedDeck] = useState<DeckForm>();
  const [deckSubbed, setDeckSubbed] = useState<boolean>(false);
  const [approveDeckMutation] = useMutation(APPROVE_DECK, {
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
    onCompleted: () => setDeckSubbed(false),
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  function deleteDeck(id: string) {
    setDeckSubbed(true);
    deleteDeckMutation({ variables: { id } });
  }

  function approveDeck(deck: DeckForm) {
    deck.category = Number(deck.category);

    approveDeckMutation({
      variables: {
        _id: deck._id,
        name: deck.name,
        description: deck.description,
        keywords: deck.keywords,
        start_date: deck.start_date,
        end_date: deck.end_date,
        category: deck.category,
        geo: deck.geo,
      },
    });
    setDeckSubbed(true);
  }

  if (deckSubbed) {
    return (
      <div className="flexbox-parent-middle-top">
        Deck has been submitted, creating/deleting...
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
    if (data.decksUnapproved.length === 0) {
      return <div>All decks are approved!</div>;
    }
    return (
      <div>
        <div id="approve-deck-list-div">
          {data.decksUnapproved.map((deck: DeckForm, i: number) => (
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
            <ApproveDeckDisplay
              deck={selectedDeck}
              approveCB={approveDeck}
              deleteCB={deleteDeck}
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
