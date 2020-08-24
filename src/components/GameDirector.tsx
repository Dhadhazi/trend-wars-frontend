/* eslint-disable no-fallthrough */
import React, { useState } from "react";
import { DeckSelector } from "./DeckSelector";
import { GameOptions } from "./GameOptions";
import { SoloGame } from "./SoloGame";
import { ResultsSolo } from "./ResultsSolo";

enum GAME_STAGES {
  DECK_SELECT,
  GAME_OPTIONS,
  SOLO_GAME,
  GAME_FINISHED,
}

//Manages the game's flow
export const GameDirector = () => {
  const [gameStage, setGameStage] = useState<GAME_STAGES>(
    GAME_STAGES.DECK_SELECT
  );
  const [selectedDeck, setSelectedDeck] = useState<string>("");
  const [gameDeck, setGameDeck] = useState<GameDeckType>();
  const [playerScore, setPlayerScore] = useState<number>(0);

  function deckSelected(id: string) {
    setSelectedDeck(id);
    setGameStage(GAME_STAGES.GAME_OPTIONS);
  }

  function deckDetails(gameDeck: GameDeckType) {
    setGameDeck(gameDeck);
    setGameStage(GAME_STAGES.SOLO_GAME);
  }

  function gameFinished(playerScore: number) {
    setPlayerScore(playerScore);
    setGameStage(GAME_STAGES.GAME_FINISHED);
  }

  function newGame(replay: boolean) {
    replay
      ? setGameStage(GAME_STAGES.SOLO_GAME)
      : setGameStage(GAME_STAGES.DECK_SELECT);
  }

  switch (gameStage) {
    case GAME_STAGES.DECK_SELECT:
      return <DeckSelector select={deckSelected} />;
    case GAME_STAGES.GAME_OPTIONS:
      return <GameOptions id={selectedDeck} gameDirectorCB={deckDetails} />;
    case GAME_STAGES.SOLO_GAME:
      if (gameDeck)
        return <SoloGame deck={gameDeck} gameDirectorCB={gameFinished} />;
    case GAME_STAGES.GAME_FINISHED:
      if (gameDeck)
        return (
          <ResultsSolo
            playerScore={playerScore}
            gameDeck={gameDeck}
            gameDirectorCB={newGame}
          />
        );
    default:
      return <DeckSelector select={deckSelected} />;
  }
};
