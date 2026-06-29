"use client";

import { useContext } from "react";
import { motion } from "framer-motion";
import { LOVE_REASONS } from "@/lib/data/reasons";
import { SectionHeader } from "@/components/SectionHeader";
import { FixedHeaderContext } from "@/components/SectionSlide";
import { useFixedSectionHeader } from "@/hooks/useFixedSectionHeader";
import { card, section } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { MOTION } from "@/lib/motion";

const REASONS_TITLE = "The little things that make every moment brighter";

export function ReasonsSection() {
  const useFixedHeader = useContext(FixedHeaderContext) !== null;

  useFixedSectionHeader(
    <SectionHeader title={REASONS_TITLE} className="mb-0 max-md:[&_h2]:text-xl" />,
    []
  );

  return (
    <section className={cn(section, useFixedHeader && "w-full")}>
      {!useFixedHeader ? (
        <SectionHeader title={REASONS_TITLE} className="mb-10 md:mb-20" />
      ) : (
        <SectionHeader
          title={REASONS_TITLE}
          className="mb-10 hidden md:mb-20 md:block"
        />
      )}

      <div className="mx-auto grid w-full max-w-xl grid-cols-1 gap-2 max-md:pb-2 sm:grid-cols-2">
        {LOVE_REASONS.map((reason, i) => (
          <motion.div
            key={reason}
            className={`${card} px-4 py-3`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i % 6) * 0.05, ...MOTION.stagger }}
          >
            <p className="font-sans text-[14px] text-rose-700/80">
              <span className="mr-2 text-rose-300" aria-hidden="true">
                ♥
              </span>
              {reason}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
