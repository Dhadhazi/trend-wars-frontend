import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isAbsolute } from "path";

type Props = {
  children: React.ReactChild;
  isActive: boolean;
};

export default function Slide({ children, isActive }: Props) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          exit={{ opacity: 0, y: 50 }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ zIndex: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
