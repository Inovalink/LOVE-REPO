"use client";

import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AMAZING_TRAITS } from "@/lib/constants";
import { SectionHeader } from "@/components/SectionHeader";
import { FixedHeaderContext } from "@/components/SectionSlide";
import { useFixedSectionHeader } from "@/hooks/useFixedSectionHeader";
import { section } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { MOTION } from "@/lib/motion";

const AMAZING_HEADER = {
  title: "Why You're Amazing",
  description: "Tap to reveal each one.",
} as const;

export function AmazingCards() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const useFixedHeader = useContext(FixedHeaderContext) !== null;

  useFixedSectionHeader(
    <SectionHeader
      {...AMAZING_HEADER}
      className="mb-0 [&_h2]:text-xl md:[&_h2]:text-[1.75rem] [&_p]:mt-2 [&_p]:text-xs md:[&_p]:text-sm"
    />,
    []
  );

  return (
    <section className={cn(section, useFixedHeader && "w-full")}>
      {!useFixedHeader && (
        <SectionHeader {...AMAZING_HEADER} className="mb-6 md:mb-8" />
      )}

      <div className="mx-auto flex w-full max-w-2xl flex-wrap justify-center gap-3 pb-4 md:pb-6">
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
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04, ...MOTION.stagger }}
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
