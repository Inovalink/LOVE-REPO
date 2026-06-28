"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOTION } from "@/lib/motion";

interface PreviousButtonProps {
  onClick: () => void;
  className?: string;
}

export function PreviousButton({ onClick, className }: PreviousButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      aria-label="Go to previous section"
      className={cn(
        "group flex items-center gap-1 rounded-full border border-rose-100/80 bg-white/60 px-3 py-1.5 font-sans text-[11px] font-medium text-rose-500/75 backdrop-blur-sm transition-colors hover:border-rose-200 hover:bg-white hover:text-rose-700",
        className
      )}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.12, ...MOTION.fast }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <ChevronLeft className="h-3 w-3 text-rose-400 transition-transform group-hover:-translate-x-0.5" />
      Back
    </motion.button>
  );
}
