import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import "./DeckSelector.css";

import { SelectCategories } from "./components/SelectCategories";
import { SelectCountries } from "./components/SelectCountries";
import { DeckSelectorBox } from "./components/DeckSelectorBox";

import { Loading } from "../../components/Loading";

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
    return <Loading />;
  }
  if (error) {
    return <div>Error, can't get the decks</div>;
  }

  const deckCategories = data.decks.map((d: GameDeckType) => d.category);
  const deckCountries = data.decks.map((d: GameDeckType) => d.geo).flat();
  return (
    <div className="flexbox-parent-middle-top flex-direction-column">
      <div id="deck-selection-grid">
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
              <DeckSelectorBox
                key={`ds-${i}`}
                index={i}
                title={deck.name}
                desc={deck.description}
                id={deck._id}
                gameDirectorCB={gameDirectorCB}
              />
            );
          })}
      </div>
    </div>
  );
};
