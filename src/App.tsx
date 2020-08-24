import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { DeckAdmin } from "./Admin/DeckAdmin";
import { CreateDeck } from "./Admin/CreateDeck";
import { Navigation } from "./components/Navigation";
import { GameDirector } from "./components/GameDirector";
import { TESTER } from "./components/TESTER";

function App() {
  return (
    <div className="container">
      <Navigation />
      <Route path="/deckadmin" component={DeckAdmin} />
      <Route path="/createdeck" component={CreateDeck} />
      <Route path="/newgame" component={GameDirector} />
      <TESTER />
    </div>
  );
}

export default App;
