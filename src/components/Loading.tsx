//Thanks to https://github.com/Darth-Knoppix/loading-animation

import React from "react";
import { motion } from "framer-motion";
import "./Loading.css";

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1,
};

export const Loading = () => {
  return (
    <div className="flexbox-parent-middle-top">
      <div id="circle-container">
        <motion.span
          id="circle"
          animate={{ rotate: 360 }}
          transition={spinTransition}
        />
      </div>
    </div>
  );
};
