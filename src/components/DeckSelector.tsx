import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { CategoryList } from "../Admin/CategoryList";
import { CountryCodes } from "../Admin/CountryCodes";

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

type CategoryType = {
  number: number;
  name: string;
};

type CountryType = {
  code: string;
  name: string;
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
        <div className="col-md-6">
          <select
            className="form-control form-control-lg"
            name="category"
            id="category"
            value={selectedCategory}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setSelectedCategory(Number(ev.target.value))
            }
          >
            {CategoryList.filter((d: CategoryType) =>
              deckCategories.includes(d.number)
            ).map((category: CategoryType, i: number) => (
              <option value={category.number} key={`categorylist-${i}`}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select
            className="form-control form-control-lg"
            name="category"
            id="category"
            value={selectedCountry}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setSelectedCountry(ev.target.value)
            }
          >
            <option value="">All Countries</option>
            {CountryCodes.filter((d: CountryType) =>
              deckCountries.includes(d.code)
            ).map((country: CountryType, i: number) => (
              <option value={country.code} key={`categorylist-${i}`}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
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
                  <div className="card" key={`card-${i}`}>
                    <div
                      className="card-header"
                      id={`heading${i}`}
                      data-toggle="collapse"
                      data-target={`#collapse${i}`}
                      aria-expanded="true"
                      aria-controls={`collapse${i}`}
                    >
                      <h5 className="mb-0">
                        <button className="btn">{deck.name}</button>
                      </h5>
                    </div>
                    <div
                      id={`collapse${i}`}
                      className="collapse"
                      aria-labelledby={`heading${i}`}
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p className="card-text text-center">
                          {deck.description}
                        </p>
                        <button
                          className="btn btn-lg btn-block btn-dark"
                          onClick={() => gameDirectorCB(deck._id)}
                        >
                          Select Deck
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="col-sm-1"></div>
      </div>
    </div>
  );
};
