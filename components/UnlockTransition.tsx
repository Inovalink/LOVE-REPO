"use client";

import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";

interface UnlockTransitionProps {
  onComplete: () => void;
}

export function UnlockTransition({ onComplete }: UnlockTransitionProps) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[60] bg-cream"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.28, ...MOTION.medium }}
      onAnimationComplete={onComplete}
      aria-hidden="true"
    />
  );
}
