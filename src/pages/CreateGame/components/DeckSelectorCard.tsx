import React from "react";

type Props = {
  index: number;
  name: string;
  description: string;
  id: string;
  gameDirectorCB: Function;
};

export const DeckSelectorCard = ({
  index,
  name,
  description,
  id,
  gameDirectorCB,
}: Props) => {
  return (
    <div className="card" key={`card-${index}`}>
      <div
        className="card-header"
        id={`heading${index}`}
        data-toggle="collapse"
        data-target={`#collapse${index}`}
        aria-expanded="true"
        aria-controls={`collapse${index}`}
      >
        <h5 className="mb-0">
          <button className="btn">{name}</button>
        </h5>
      </div>
      <div
        id={`collapse${index}`}
        className="collapse"
        aria-labelledby={`heading${index}`}
        data-parent="#accordion"
      >
        <div className="card-body">
          <p className="card-text text-center">{description}</p>
          <button
            className="btn btn-lg btn-block btn-dark"
            onClick={() => gameDirectorCB(id)}
          >
            Select Deck
          </button>
        </div>
      </div>
    </div>
  );
};
