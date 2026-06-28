"use client";

import { motion } from "framer-motion";

interface UnlockTransitionProps {
  onComplete: () => void;
}

export function UnlockTransition({ onComplete }: UnlockTransitionProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50"
      initial={{ backgroundColor: "rgba(255,255,255,0)" }}
      animate={{
        backgroundColor: [
          "rgba(255,255,255,1)",
          "rgba(255,255,255,1)",
          "rgba(253, 242, 248,1)",
          "rgba(253, 242, 248,0)",
        ],
      }}
      transition={{ duration: 2.5, times: [0, 0.3, 0.6, 1], ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    />
  );
}
