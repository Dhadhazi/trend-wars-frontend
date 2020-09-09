import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { CreateDeckForm } from "./components/CreateDeckForm";
import Fade from "../../animations/Fade";
import { DeckSubmitted } from "./components/DeckSubmitted";

const CREATE_DECK = gql`
  mutation userAddDeck(
    $name: String
    $description: String
    $keywords: [String]
    $start_date: String
    $end_date: String
    $category: Int
    $geo: [String]
  ) {
    userAddDeck(
      deck: {
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

type DeckForm = {
  name: string;
  description: string;
  keywordsForm: string;
  keywords: Array<string>;
  start_date: string;
  end_date: string;
  category: string | number;
  geo: Array<string>;
};

export const CreateDeck = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [createDeckMutation] = useMutation(CREATE_DECK, {
    onCompleted: () => {
      setSubmitted(true);
    },
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  function SubmitDeck(deck: DeckForm) {
    deck.category = Number(deck.category);
    createDeckMutation({
      variables: {
        name: deck.name,
        description: deck.description,
        keywords: deck.keywords,
        start_date: deck.start_date,
        end_date: deck.end_date,
        category: deck.category,
        geo: deck.geo,
      },
    });
  }

  return submitted ? (
    <Fade>
      <DeckSubmitted />
    </Fade>
  ) : (
    <Fade>
      <CreateDeckForm SubmitDeck={SubmitDeck} />
    </Fade>
  );
};
