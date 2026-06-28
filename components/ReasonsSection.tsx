"use client";

import { motion } from "framer-motion";
import { LOVE_REASONS } from "@/lib/data/reasons";
import { SectionHeader } from "@/components/SectionHeader";
import { card, section } from "@/lib/styles";

export function ReasonsSection() {
  return (
    <section className={section}>
      <SectionHeader
        title="The little things that make every moment brighter"
        className="mb-16 md:mb-20"
      />

      <div className="mx-auto grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-2">
        {LOVE_REASONS.map((reason, i) => (
          <motion.div
            key={reason}
            className={`${card} px-4 py-3`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: (i % 6) * 0.05, duration: 0.5 }}
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
