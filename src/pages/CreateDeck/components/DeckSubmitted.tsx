import React from "react";
import { BButton } from "../../../components/BButton";
import { Link } from "react-router-dom";

export const DeckSubmitted = () => {
  //TODO: This should be more colorful, an image maybe
  return (
    <div className="flexbox-parent-middle-top">
      <div>
        Thank you for submitting a Questionnaire! We are soon checking it, and
        if it is a good one, we put it together and let anyone play it!{" "}
      </div>
      <Link to="/">
        <BButton text="Back to the main page" onClick={() => {}} />
      </Link>
    </div>
  );
};
