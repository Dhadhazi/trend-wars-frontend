import React from "react";
import { Route } from "react-router-dom";
import { GameDirector, GAME_STAGES } from "./components/GameDirector";
import { TESTER } from "./components/TESTER";
import { Dashboard } from "./pages/Dashboard/dashboard";
import { TrendWarsLogo } from "./components/TrendWarsLogo";
import { CreateDeck } from "./pages/CreateDeck/CreateDeck";
import { Admin } from "./pages/Admin/Admin";

function App() {
  return (
    <div>
      <TrendWarsLogo />
      <Route exact path="/" component={Dashboard} />

      <Route path="/createquestions" component={CreateDeck} />
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
      <Route path="/admin" component={Admin} />
    </div>
  );
}

export default App;
