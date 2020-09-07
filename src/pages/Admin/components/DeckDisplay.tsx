import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CountryCodes } from "../../../constants/CountryCodes";
import { CategoryList } from "../../../constants/CategoryList";
import "./DeckDisplay.css";
import { BButton } from "../../../components/BButton";

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

type Category = {
  number: number;
  name: string;
};

type Country = {
  code: string;
  name: string;
};

type Props = {
  deck: DeckForm;
  approveCB: Function;
};

export const DeckDisplay = ({ deck, approveCB }: Props) => {
  const [keywordInput, setKeywordInput] = useState<string>("");
  const [keywordList, setkeywordList] = useState<string[]>([]);

  const [allCountries, setAllCountries] = useState<boolean>(false);

  const { register, handleSubmit, watch, setValue } = useForm<DeckForm>({
    mode: "onBlur",
  });
  const todayDate = new Date().toISOString().slice(0, 10);

  const approveDeck = handleSubmit((data: DeckForm) => {
    if (data.geo.includes("all")) data.geo = [];
    if (keywordList.length < 4) {
      alert("Add more keywords, and I will add better alert msg");
    } else {
      data.keywords = keywordList;
      data._id = deck._id;
      approveCB(data);
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

  useEffect(() => {
    setValue("name", deck.name);
    setValue("description", deck.description);
    setValue("category", deck.category);
    setValue("start_date", deck.start_date);
    setValue("end_date", deck.end_date);
    setkeywordList(deck.keywords);
    if (deck.geo.length === 0) setAllCountries(true);
  }, [deck]);

  return (
    <div className="flexbox-parent-middle-top flex-column">
      <div id="createdeck-grid-admin">
        <div id="name-grid-admin">
          <label htmlFor="name">Name of the Questionnaire</label>
        </div>
        <div id="nameinput-grid-admin">
          <input
            ref={register({ required: true, minLength: 5 })}
            type="text"
            id="name"
            name="name"
          />
        </div>
        <div id="desc-grid-admin">
          <label htmlFor="description">Short Description</label>
        </div>
        <div id="descinput-grid-admin">
          <textarea
            id="description"
            name="description"
            placeholder="Minimum 15 characters"
            ref={register({ required: true, minLength: 15 })}
          />
        </div>
        <div id="category-grid-admin">
          <label htmlFor="category">Select the category</label>
        </div>
        <div id="categoryselect-grid-admin">
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

        <div id="startdate-grid-admin">
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
        <div id="enddate-grid-admin">
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
        <div id="addkeyword-grid-admin">
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
        <div id="keywords-grid-admin">
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
        <div id="countryheader-grid-admin">Choose Country</div>
        <div id="countryselect-grid-admin">
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
                  defaultChecked={deck.geo.includes(country.code)}
                  value={country.code}
                  ref={register()}
                  disabled={allCountries}
                />
              </div>
              <label htmlFor={`geo-${country.code}`}>{country.name}</label>
            </div>
          ))}
        </div>
        <div id="submitbutton-grid-admin">
          {deck.approved ? (
            ""
          ) : (
            <BButton text="Approve Deck" onClick={approveDeck} />
          )}
          <BButton text="Delete Deck" onClick={approveDeck} />
        </div>
      </div>
    </div>
  );
};
