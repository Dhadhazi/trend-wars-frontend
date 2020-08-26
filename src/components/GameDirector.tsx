/* eslint-disable no-fallthrough */
import React, { useState } from "react";
import { DeckSelector } from "./DeckSelector";
import { GameOptions } from "./GameOptions";
import { SoloGame } from "./SoloGame";
import { ResultsSolo } from "./ResultsSolo";
import { MultiWaitingRoom } from "./MultiWaitingRoom";

enum GAME_STAGES {
  DECK_SELECT,
  GAME_OPTIONS,
  SOLO_GAME,
  MULTI_GAME_SETUP,
  GAME_FINISHED,
}

export enum GAME_MODES {
  SOLO_PAIRS,
  MULTI_PAIRS,
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
    if (gameDeck.gameMode === GAME_MODES.SOLO_PAIRS) {
      setGameStage(GAME_STAGES.SOLO_GAME);
    } else if (gameDeck.gameMode === GAME_MODES.MULTI_PAIRS) {
      setGameStage(GAME_STAGES.MULTI_GAME_SETUP);
    }
  }

  function gameFinished(playerScore: number) {
    setPlayerScore(playerScore);
    setGameStage(GAME_STAGES.GAME_FINISHED);
  }

  function multiGameFinished() {}

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
    case GAME_STAGES.MULTI_GAME_SETUP:
      if (gameDeck)
        return (
          <MultiWaitingRoom
            deck={gameDeck}
            gameDirectorCB={multiGameFinished}
          />
        );
    default:
      return <DeckSelector select={deckSelected} />;
  }
};
