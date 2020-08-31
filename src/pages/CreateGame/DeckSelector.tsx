import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import { DeckSelectorCard } from "./components/DeckSelectorCard";
import { SelectCategories } from "./components/SelectCategories";
import { SelectCountries } from "./components/SelectCountries";

const GET_DECKS = gql`
  query getDecks {
    decks {
      _id
      name
      category
      geo
      description
    }
  }
`;

type Props = {
  gameDirectorCB: Function;
};

export const DeckSelector = ({ gameDirectorCB }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const { loading, error, data } = useQuery(GET_DECKS);

  if (loading) {
    return <div className="container">Loading Data...</div>;
  }
  if (error) {
    return <div>Error, can't get the decks</div>;
  }

  const deckCategories = data.decks.map((d: GameDeckType) => d.category);
  const deckCountries = data.decks.map((d: GameDeckType) => d.geo).flat();
  return (
    <div className="container margin-top">
      <div className="row">
        <SelectCategories
          deckCategories={deckCategories}
          selectedCategory={selectedCategory}
          setCategory={setSelectedCategory}
        />

        <SelectCountries
          deckCountries={deckCountries}
          selectedCountry={selectedCountry}
          setCountry={setSelectedCountry}
        />

        <div className="col-sm-1 "></div>
        <div className="col-sm-10 margin-top ">
          <div id="accordion">
            {data.decks
              .filter((d: GameDeckType) => {
                if (selectedCategory === 0) return d;
                return d.category === selectedCategory;
              })
              .filter((d: GameDeckType) => {
                if (selectedCountry === "") return d;
                return d.geo.includes(selectedCountry);
              })
              .map((deck: GameDeckType, i: number) => {
                return (
                  <DeckSelectorCard
                    index={i}
                    name={deck.name}
                    description={deck.description}
                    id={deck._id}
                    gameDirectorCB={gameDirectorCB}
                  />
                );
              })}
          </div>
        </div>
        <div className="col-sm-1"></div>
      </div>
    </div>
  );
};
