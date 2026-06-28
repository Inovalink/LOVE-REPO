"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AMAZING_TRAITS } from "@/lib/constants";
import { SectionHeader } from "@/components/SectionHeader";
import { section } from "@/lib/styles";
import { cn } from "@/lib/utils";

export function AmazingCards() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  return (
    <section className={section}>
      <SectionHeader
        title="Why You're Amazing"
        description="Tap to reveal each one."
      />

      <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-3">
        {AMAZING_TRAITS.map((trait, i) => {
          const isRevealed = revealed.has(i);
          return (
            <motion.button
              key={trait}
              onClick={() => setRevealed((prev) => new Set(prev).add(i))}
              className={cn(
                "flex h-20 w-20 items-center justify-center rounded-full border font-sans text-sm transition-colors md:h-[88px] md:w-[88px]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200",
                isRevealed
                  ? "border-rose-200 bg-rose-50 text-rose-800"
                  : "border-rose-100 bg-white/70 text-rose-300"
              )}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              whileTap={{ scale: 0.96 }}
              aria-label={`Reveal: ${trait}`}
            >
              {isRevealed ? trait : "·"}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
