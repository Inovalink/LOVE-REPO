"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOTION } from "@/lib/motion";

interface ContinueButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
  delay?: number;
}

export function ContinueButton({
  onClick,
  label = "Continue",
  className,
  delay = 0.18,
}: ContinueButtonProps) {
  return (
    <motion.div
      className={cn("flex shrink-0 justify-center pt-6 pb-2", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, ...MOTION.medium }}
    >
      <motion.button
        onClick={onClick}
        className="group flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-6 py-2.5 font-sans text-[13px] font-medium tracking-wide text-rose-700/80 shadow-[0_2px_16px_rgba(244,114,182,0.1)] backdrop-blur-sm transition-colors hover:border-rose-200 hover:bg-white hover:text-rose-800"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {label}
        <ChevronRight className="h-3.5 w-3.5 text-rose-400 transition-transform group-hover:translate-x-0.5" />
      </motion.button>
    </motion.div>
  );
}
