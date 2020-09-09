import React, { useState } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import Fade from "../../animations/Fade";

export const Dashboard = () => {
  const [help, setHelp] = useState<boolean>(false);
  function toggleHelp() {
    setHelp(!help);
  }
  return (
    <Fade>
      <div className="flexbox-parent-middle-middle">
        <div id="grid-dashboard-container">
          <div id="grid-dashboard-help">
            <img
              src="/images/helpbtn.jpg"
              alt="Help"
              onClick={() => toggleHelp()}
            />
          </div>
          <div id="help-div-outer" style={{ display: help ? "" : "none" }}>
            <div id="help-div-inner">
              <img
                src="/images/helpguide.jpg"
                alt="Help Guide"
                width="100%"
                onClick={() => toggleHelp()}
              />
            </div>
          </div>
          <Link
            to="/join"
            id="grid-dashboard-join"
            className="bottom-center-text darkened dashboard-font"
          >
            Join Game
          </Link>
          <Link
            to="/newgame"
            id="grid-dashboard-creategame"
            className="bottom-center-text darkened dashboard-font"
          >
            Create Game
          </Link>
          <Link
            to="/createquestions"
            id="grid-dashboard-createquestions"
            className="darkened dashboard-font"
          >
            Create Questions
          </Link>
        </div>
      </div>
    </Fade>
  );
};
