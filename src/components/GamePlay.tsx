import React from "react";
import { CountdownTimer } from "./CountdownTimer";
import { GameButton, BUTTON_STATES } from "./GameButton";
import "./GamePlay.css";
import Fade from "../animations/Fade";
import { HeadSender } from "../pages/Multiplayer/components/HeadSender";
import { HeadChoosingBox } from "../pages/Multiplayer/components/HeadChoosingBox";

type Props = {
  gameState: number;
  deck: GameDeckType;
  timerDone: Function;
  buttonState: BUTTON_STATES;
  playerChoice: Function;
  players?: [MultiPlayer];
  gameId?: string;
};

export const GamePlay = ({
  gameState,
  deck,
  timerDone,
  buttonState,
  playerChoice,
  players,
  gameId = "",
}: Props) => {
  const numberOfQuestions = deck.pairs.length;
  return (
    <Fade>
      <div className="flexbox-parent-middle-top flex-direction-column">
        <div id="gameplay-grid">
          <div id="gameinfo">
            Total questions: {gameState + 1}/{numberOfQuestions}
            <br />
            {deck.geo}
            <br />
            {deck.dateString}
            <br />
          </div>
          <div id="clock">
            <CountdownTimer
              seconds={deck.timer}
              trigger={gameState}
              playing={buttonState === BUTTON_STATES.CHOOSE ? true : false}
              completeCB={timerDone}
            />
          </div>

          <div id="waiting">
            {players && buttonState === BUTTON_STATES.RESULT
              ? "Waiting for other players"
              : ""}
          </div>

          <div id="gamebuttons">
            <GameButton
              pair={deck.pairs[gameState][0]}
              onclick={playerChoice}
              state={buttonState}
            />
            {players ? <HeadSender gameId={gameId} /> : ""}
            <GameButton
              pair={deck.pairs[gameState][1]}
              onclick={playerChoice}
              state={buttonState}
            />
          </div>

          <div id="bottomtext">
            Choose which keyword was trending more in {deck.geo}{" "}
            {deck.dateString}
            {players ? (
              <div id="scoreheadbox-div">
                <table>
                  <thead>
                    <tr>
                      <th>Player</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players
                      .sort((a, b) => b.points - a.points)
                      .map((p: MultiPlayer, i: number) => {
                        return (
                          <tr key={`scoreboard-${i}`}>
                            <td>{p.nick}</td>
                            <td>{p.points}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <HeadChoosingBox gameId={gameId} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
};
