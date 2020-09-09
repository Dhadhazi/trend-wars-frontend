import React from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import Fade from "../../animations/Fade";

export const Dashboard = () => {
  return (
    <Fade>
      <div className="flexbox-parent-middle-middle">
        <div id="grid-dashboard-container">
          <div id="grid-dashboard-title"></div>
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
