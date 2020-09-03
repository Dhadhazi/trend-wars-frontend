import React from "react";
import { BButton } from "../../../components/BButton";
import "./MutliGameResult.css";

type Props = {
  gameRoom: GameRoomType;
  nick: string;
  gameDirectorCB: Function;
};

export const MultiGameResult = ({ gameRoom, nick, gameDirectorCB }: Props) => {
  return (
    <div className="flexbox-parent-middle-top flex-direction-column">
      <div id="results-title">
        Congratulations, you got X right from
        {gameRoom.gameDeck.pairs.length} questions right!
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {gameRoom.players
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
      </div>
      <div id="results-deckname">{gameRoom.gameDeck.name}</div>
      <div id="results-info">
        Date: {gameRoom.gameDeck.dateString}
        <br />
        Territory: {gameRoom.gameDeck.geo}
      </div>

      <BButton text="New Game" onClick={() => gameDirectorCB(true)} />
    </div>
  );
};
