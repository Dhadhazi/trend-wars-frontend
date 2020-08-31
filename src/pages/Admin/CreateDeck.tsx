import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CountryCodes } from "../../constants/CountryCodes";
import { CategoryList } from "../../constants/CategoryList";

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

type Category = {
  number: number;
  name: string;
};

type Country = {
  code: string;
  name: string;
};

export const CreateDeck = () => {
  const [submitted, setSubitted] = useState<boolean>(false);
  const todayDate = new Date().toISOString().slice(0, 10);
  const { register, handleSubmit } = useForm<DeckForm>({
    mode: "onBlur",
  });

  const [createDeckMutation] = useMutation(CREATE_DECK, {
    onCompleted: () => setSubitted(false),
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  const onSubmit = handleSubmit((data: DeckForm) => {
    data.category = Number(data.category);
    data.keywords = data.keywordsForm.split(",").map((k) => k.trim());
    createDeckMutation({
      variables: {
        name: data.name,
        description: data.description,
        keywords: data.keywords,
        start_date: data.start_date,
        end_date: data.end_date,
        category: data.category,
        geo: data.geo,
      },
    });
    setSubitted(true);
  });

  return (
    <div>
      {submitted ? (
        "Deck submitted, creating..."
      ) : (
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name of the deck</label>
            <input
              ref={register({ required: true, minLength: 5 })}
              type="text"
              className="form-control"
              id="name"
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              ref={register({ required: true, minLength: 15 })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="keywordsForm">Keywords (Need at least 4)</label>
            <input
              type="text"
              className="form-control"
              id="keywordsForm"
              name="keywordsForm"
              ref={register({
                required: true,
                validate: (value) => {
                  if (value.split(",").length >= 4) {
                    return true;
                  } else {
                    return false;
                  }
                },
              })}
            />
            <small className="form-text text-muted">
              Keywords must be separated by comma, like: Ninja, Pirate, Darth
              Vader, Luke Skywalker
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="start_date">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="start_date"
              name="start_date"
              min="2004-01-01"
              max={todayDate}
              ref={register({ required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_date">End Date</label>
            <input
              type="date"
              className="form-control"
              id="end_date"
              name="end_date"
              min="2004-01-01"
              max={todayDate}
              ref={register({ required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Example select</label>
            <select
              className="form-control form-control-lg"
              name="category"
              id="category"
              ref={register({ required: true })}
            >
              {CategoryList.map((category: Category, index: number) => (
                <option value={category.number} key={`cat-${index}`}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <h4>Select the territories/countries</h4>
              <h6>No selection means the whole world</h6>
            </div>{" "}
            {CountryCodes.map((country: Country, index: number) => (
              <div className="col-4" key={`country-${index}`}>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={`geo-${country.code}`}
                    name="geo"
                    value={country.code}
                    ref={register()}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={`geo-${country.code}`}
                  >
                    {country.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary btn-lg">
              Create Deck
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
