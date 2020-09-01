import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { DeckAdmin } from "./pages/Admin/DeckAdmin";
import { CreateDeck } from "./pages/Admin/CreateDeck";
import { Navigation } from "./components/Navigation";
import { GameDirector, GAME_STAGES } from "./components/GameDirector";
import { TESTER } from "./components/TESTER";
import { Login } from "./pages/Login/Login";
import { Dashboard } from "./pages/Dashboard/dashboard";

function App() {
  return (
    <div className="container">
      <Navigation />
      <Route exact path="/" component={Dashboard} />
      <Route path="/deckadmin" component={DeckAdmin} />
      <Route path="/createdeck" component={CreateDeck} />
      <Route path="/login" component={Login} />
      <Route
        path="/newgame"
        render={() => <GameDirector initialState={GAME_STAGES.DECK_SELECT} />}
      />
      <Route
        path="/join"
        render={() => (
          <GameDirector initialState={GAME_STAGES.MULTI_JOIN_GAME} />
        )}
      />
      <TESTER />
    </div>
  );
}

export default App;
