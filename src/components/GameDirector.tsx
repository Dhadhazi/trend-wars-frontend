/* eslint-disable no-fallthrough */
import React, { useState } from "react";
import { DeckSelector } from "./DeckSelector";
import { GameOptions } from "./GameOptions";
import { SoloGame } from "./SoloGame";
import { ResultsSolo } from "./ResultsSolo";
import { JoinGame } from "./JoinGame";
import { MultiGame } from "./MultiGame";

export enum GAME_STAGES {
  DECK_SELECT,
  GAME_OPTIONS,
  SOLO_GAME,
  MULTI_JOIN_GAME,
  MULTI_GAME,
  GAME_FINISHED,
}

export enum GAME_MODES {
  SOLO_PAIRS,
  MULTI_PAIRS,
}

type Props = {
  initialState: GAME_STAGES;
};

//Declaring variables here, so it can used anywhere in the function
let selectedDeck = "";
let score = 0;
let playerNick = "";

/*Manages the game's flow by directing the routes between components
Create Game (DECK_SELECT) => Game Options (GAME_OPTIONS)
solo game: SOLO_GAME=>GAME_FINISHED
multi game:  MULTI_JOIN_GAME => MULTI_GAME 

gameDirectorCB is the input for all components that they call when their part is finished
*/

export const GameDirector = ({
  initialState = GAME_STAGES.DECK_SELECT,
}: Props) => {
  const [gameStage, setGameStage] = useState<GAME_STAGES>(initialState);
  const [gameRoom, setGameRoom] = useState<GameRoomType>();

  function deckSelected(id: string) {
    selectedDeck = id;
    setGameStage(GAME_STAGES.GAME_OPTIONS);
  }

  function deckDetails(gameRoom: GameRoomType, nick: string) {
    setGameRoom(gameRoom);
    playerNick = nick;
    if (gameRoom.gameDeck.gameMode === GAME_MODES.SOLO_PAIRS) {
      setGameStage(GAME_STAGES.SOLO_GAME);
    } else if (gameRoom.gameDeck.gameMode === GAME_MODES.MULTI_PAIRS) {
      setGameStage(GAME_STAGES.MULTI_GAME);
    }
  }

  function gameFinished(playerScore: number) {
    score = playerScore;
    setGameStage(GAME_STAGES.GAME_FINISHED);
  }

  function joinMultiGame(gameRoom: GameRoomType, nick: string) {
    setGameRoom(gameRoom);
    playerNick = nick;
    setGameStage(GAME_STAGES.MULTI_GAME);
  }

  function multiGameFinished() {}

  function newGame(replay: boolean) {
    replay
      ? setGameStage(GAME_STAGES.SOLO_GAME)
      : setGameStage(GAME_STAGES.DECK_SELECT);
  }

  switch (gameStage) {
    case GAME_STAGES.DECK_SELECT:
      return <DeckSelector gameDirectorCB={deckSelected} />;
    case GAME_STAGES.GAME_OPTIONS:
      return <GameOptions id={selectedDeck} gameDirectorCB={deckDetails} />;
    case GAME_STAGES.SOLO_GAME:
      if (gameRoom)
        return (
          <SoloGame deck={gameRoom.gameDeck} gameDirectorCB={gameFinished} />
        );
    case GAME_STAGES.MULTI_JOIN_GAME:
      return <JoinGame gameDirectorCB={joinMultiGame} />;
    case GAME_STAGES.GAME_FINISHED:
      if (gameRoom)
        return (
          <ResultsSolo
            playerScore={score}
            gameDeck={gameRoom.gameDeck}
            gameDirectorCB={newGame}
          />
        );
    case GAME_STAGES.MULTI_GAME:
      if (gameRoom)
        return (
          <MultiGame
            gameRoom={gameRoom}
            nick={playerNick}
            gameDirectorCB={multiGameFinished}
          />
        );
    default:
      return <DeckSelector gameDirectorCB={deckSelected} />;
  }
};
