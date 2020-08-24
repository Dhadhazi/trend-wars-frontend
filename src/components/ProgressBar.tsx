import React from "react";

export const ProgressBar = () => {
  return (
    <div className="progress">
      <div
        className="progress-bar progress-bar-striped"
        role="progressbar"
        style={{ width: "55%" }}
        aria-valuenow={25}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        3 seconds left
      </div>
    </div>
  );
};
