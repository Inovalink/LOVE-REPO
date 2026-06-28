"use client";

import { motion } from "framer-motion";
import { PROMISES } from "@/lib/data/promises";
import { SectionHeader } from "@/components/SectionHeader";
import { section } from "@/lib/styles";

export function PromiseSection() {
  return (
    <section className={`${section} overflow-hidden`}>
      <div className="mx-auto max-w-xl rounded-2xl bg-rose-900 px-6 py-10 md:px-10 md:py-12">
        <SectionHeader
          title="My Promise To You"
          description="Words I mean with all my heart."
          className="[&_h2]:text-white [&_p]:text-rose-300/70"
        />

        <ul className="space-y-3">
          {PROMISES.map((promise, i) => (
            <motion.li
              key={promise}
              className="flex gap-3 font-sans text-[14px] leading-relaxed text-rose-100/85"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-rose-400" />
              {promise}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
