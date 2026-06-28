"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SurpriseButton() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(true);
    setTimeout(() => setActive(false), 4500);
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        aria-label="A little surprise"
        className="fixed bottom-6 left-5 z-40 rounded-full border border-rose-100 bg-white/80 px-4 py-2 font-sans text-[13px] text-rose-600/80 backdrop-blur-sm transition-colors hover:bg-white sm:bottom-8 sm:left-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        whileTap={{ scale: 0.97 }}
      >
        A surprise ♥
      </motion.button>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute inset-0 bg-rose-950/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.p
              className="relative z-10 max-w-md text-center font-sans text-xl font-medium leading-relaxed tracking-[-0.01em] text-white md:text-2xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              You are the best thing
              <br />
              <span className="text-rose-300">that ever happened to me.</span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
