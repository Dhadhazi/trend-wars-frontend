import React from "react";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand">Navbar</div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink
              to="/deckadmin"
              className="nav-link"
              activeClassName="active"
            >
              DeckAdmin <span className="sr-only">(current)</span>
            </NavLink>
            <NavLink
              to="/createdeck"
              className="nav-link"
              activeClassName="active"
            >
              Deck Crator
            </NavLink>
            <NavLink
              to="/newgame"
              className="nav-link"
              activeClassName="active"
            >
              New Game
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};
