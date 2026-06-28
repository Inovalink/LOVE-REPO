"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ROMANTIC_QUOTES } from "@/lib/data/quotes";
import { SectionHeader } from "@/components/SectionHeader";
import { card, section } from "@/lib/styles";

export function QuotesCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROMANTIC_QUOTES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const quote = ROMANTIC_QUOTES[index];

  return (
    <section className={section}>
      <SectionHeader title="Words of Love" />

      <div className={`${card} mx-auto max-w-xl px-8 py-10 text-center`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-sans text-[15px] leading-relaxed text-rose-700/75 md:text-base">
              &ldquo;{quote.text}&rdquo;
            </p>
            <p className="mt-4 font-sans text-xs text-rose-400">
              — {quote.author}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index % 5 === i ? "w-5 bg-rose-300" : "w-1 bg-rose-100"
              }`}
              aria-label={`Quote group ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
