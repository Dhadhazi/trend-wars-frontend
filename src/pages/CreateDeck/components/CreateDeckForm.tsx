import React, { useState } from "react";
import { useForm } from "react-hook-form";

import "./CreateDeckForm.css";

import { CountryCodes } from "../../../constants/CountryCodes";
import { CategoryList } from "../../../constants/CategoryList";
import { BButton } from "../../../components/BButton";

type DeckForm = {
  name: string;
  description: string;
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

type Props = {
  SubmitDeck: Function;
};

export const CreateDeckForm = ({ SubmitDeck }: Props) => {
  const [keywordInput, setKeywordInput] = useState<string>("");
  const [keywordList, setkeywordList] = useState<string[]>([]);
  const [allCountries, setAllCountries] = useState<boolean>(false);

  const todayDate = new Date().toISOString().slice(0, 10);

  const { register, handleSubmit, watch } = useForm<DeckForm>({
    mode: "onBlur",
  });

  const onSubmit = handleSubmit((data: DeckForm) => {
    if (data.geo.includes("all")) data.geo = [];
    if (keywordList.length < 4) {
      alert("Add more keywords, and I will add better alert msg");
    } else {
      data.keywords = keywordList;
      SubmitDeck(data);
    }
  });

  function addKeyword() {
    if (keywordList.includes(keywordInput)) {
      alert("Cant add the same keyword twice");
    } else if (keywordInput.length >= 3) {
      setkeywordList((prevState: string[]) => [...prevState, keywordInput]);
      setKeywordInput("");
      document.getElementById("keywordsForm")?.focus();
    }
  }

  function removeKeyword(word: string) {
    const newState = keywordList.filter((w: string) => w !== word);
    setkeywordList(newState);
  }

  return (
    <div className="flexbox-parent-middle-top flex-column">
      <div id="createdeck-grid">
        <div id="name-grid">
          <label htmlFor="name">Name of the Questionnaire</label>
        </div>
        <div id="nameinput-grid">
          {" "}
          <input
            ref={register({ required: true, minLength: 5 })}
            type="text"
            id="name"
            name="name"
          />
        </div>
        <div id="desc-grid">
          <label htmlFor="description">Short Description</label>
        </div>
        <div id="descinput-grid">
          <textarea
            id="description"
            name="description"
            placeholder="Minimum 15 characters"
            ref={register({
              required: true,
              minLength: 15,
            })}
          />
        </div>
        <div id="sourceheader-grid">
          Questionnaire Source Details
          <div className="detail-information">
            Let us know what details we should collect the trends. Select a
            category (can be all caregories), give a start-end date, keywords
            which will become questions, and any territorial restrictions. After
            submitting an Admin will check your submission, and if approved will
            be available to play for anybody.
          </div>
        </div>
        <div id="category-grid">
          <label htmlFor="category">Select the category</label>
        </div>
        <div id="categoryselect-grid">
          {" "}
          <select
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

        <div id="startdate-grid">
          <label htmlFor="start_date">Start Date</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            min="2004-01-01"
            max={watch("end_date", todayDate)}
            ref={register({ required: true })}
          />
        </div>
        <div id="enddate-grid">
          <label htmlFor="end_date">End Date</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            min={watch("start_date", "2004-01-01")}
            max={todayDate}
            ref={register({ required: true })}
          />
        </div>
        <div id="addkeyword-grid">
          {" "}
          <label htmlFor="keywordsForm">Add a keyword</label>{" "}
          <div id="keyword-input-div">
            <input
              type="text"
              id="keywordsForm"
              name="keywordsForm"
              placeholder="3 character minimum"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
            />
            <button id="keyword-add-btn" onClick={() => addKeyword()}>
              Add
            </button>
          </div>
          <div className="detail-information">
            Must add at least 4 keywords.
          </div>
        </div>
        <div id="keywords-grid">
          <div className="detail-information">
            Click on a keyword to remove it
          </div>
          <div id="keywords-list-div">
            {keywordList.map((w: string, i: number) => (
              <div
                className="keyword-list-element"
                key={`keyword-${i}`}
                onClick={() => removeKeyword(w)}
              >
                {w}
              </div>
            ))}
          </div>
        </div>
        <div id="countryheader-grid">
          Choose Country
          <div className="detail-information">
            You can choose any amount of countries to get the trends from, or
            just choose All Around the World
          </div>
        </div>
        <div id="countryselect-grid">
          <div className="country-box">
            <div>
              <input
                type="checkbox"
                id="geo-all"
                name="geo"
                value="all"
                ref={register()}
                checked={allCountries}
                onChange={() => setAllCountries(!allCountries)}
              />
            </div>
            <label htmlFor="geo-all" id="allcountries-label">
              All Around the World
            </label>
          </div>
          {CountryCodes.map((country: Country, index: number) => (
            <div key={`country-${index}`} className="country-box">
              <div>
                <input
                  type="checkbox"
                  id={`geo-${country.code}`}
                  name="geo"
                  value={country.code}
                  ref={register()}
                  disabled={allCountries}
                />
              </div>
              <label htmlFor={`geo-${country.code}`}>{country.name}</label>
            </div>
          ))}
        </div>
        <div id="submitbutton-grid">
          <BButton text="Submit" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};
