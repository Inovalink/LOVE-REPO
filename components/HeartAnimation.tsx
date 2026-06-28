"use client";

import { motion } from "framer-motion";

export function HeartAnimation({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.div
        className="absolute h-24 w-24 rounded-full bg-rose-200/25 blur-2xl md:h-28 md:w-28"
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-rose-100/90 bg-white/85 shadow-[0_4px_24px_rgba(244,114,182,0.14)] backdrop-blur-sm md:h-[4.75rem] md:w-[4.75rem]"
        animate={{ scale: [1, 1.035, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 md:h-8 md:w-8" aria-hidden="true">
          <defs>
            <linearGradient id="heartFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fda4af" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          <path
            d="M16 27.5s-9.5-6.2-11.8-11.4C2.2 11.4 4.6 7 8.4 7c2.2 0 3.8 1.2 4.8 2.8.5-.8 1.2-1.5 2.1-2 1.4-.8 3-.8 4.4 0 3.5 2 4.8 6.2 2.6 9.8C22.2 20.8 16 27.5 16 27.5z"
            fill="url(#heartFill)"
          />
        </svg>
      </motion.div>
    </div>
  );
}
