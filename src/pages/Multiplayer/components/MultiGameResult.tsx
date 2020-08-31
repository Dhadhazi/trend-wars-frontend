import React from "react";

type Props = {
  gameRoom: GameRoomType;
  nick: string;
  gameDirectorCB: Function;
};

export const MultiGameResult = ({ gameRoom, nick, gameDirectorCB }: Props) => {
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Points</th>
          </tr>
        </thead>
        <tbody>
          {gameRoom.players
            .sort((a, b) => b.points - a.points)
            .map((player: MultiPlayer, i: number) => (
              <tr key={`ranking-${i}`}>
                <th scope="row">{i + 1}</th>
                <td>{player.nick}</td>
                <td>{player.points}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
