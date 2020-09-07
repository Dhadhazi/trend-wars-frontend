import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  children: React.ReactChild;
};

export default function Fade({ children }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
