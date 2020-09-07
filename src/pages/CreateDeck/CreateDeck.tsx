import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreateDeckForm } from "./components/CreateDeckForm";

const CREATE_DECK = gql`
  mutation addDeck(
    $name: String
    $description: String
    $keywords: [String]
    $start_date: String
    $end_date: String
    $category: Int
    $geo: [String]
  ) {
    addDeck(
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
  const [createDeckMutation] = useMutation(CREATE_DECK, {
    onCompleted: () => {
      console.log("done");
    },
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  return <CreateDeckForm />;
};
