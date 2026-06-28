"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { FLOATING_NOTES } from "@/lib/constants";
import { randomBetween } from "@/lib/utils";

export function FloatingLoveNotes() {
  const notes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        text: FLOATING_NOTES[i % FLOATING_NOTES.length],
        x: randomBetween(4, 88),
        y: randomBetween(15, 85),
        duration: randomBetween(18, 28),
        delay: randomBetween(0, 12),
      })),
    []
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-10"
      aria-hidden="true"
    >
      {notes.map((note) => (
        <motion.div
          key={note.id}
          className="absolute whitespace-nowrap rounded-full border border-white/50 bg-white/35 px-4 py-2 font-sans text-[13px] text-rose-700/55 shadow-[0_4px_20px_rgba(244,114,182,0.1)] backdrop-blur-md"
          style={{ left: `${note.x}%`, top: `${note.y}%` }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: [0, 0.85, 0.85, 0],
            y: [0, -30, -60, -90],
            x: [0, 15, -10, 5],
            scale: [0.9, 1, 1, 0.95],
          }}
          transition={{
            duration: note.duration,
            delay: note.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {note.text}
        </motion.div>
      ))}
    </div>
  );
}
