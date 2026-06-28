"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { COMPLIMENTS } from "@/lib/data/compliments";
import { pickRandom } from "@/lib/utils";
import { SectionHeader } from "@/components/SectionHeader";
import { card, section } from "@/lib/styles";

export function ComplimentGenerator() {
  const [compliment, setCompliment] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const generate = () => {
    let next = pickRandom([...COMPLIMENTS]);
    if (next === compliment) next = pickRandom([...COMPLIMENTS]);
    setCompliment(next);
    setKey((k) => k + 1);
  };

  return (
    <section className={`${section} text-center`}>
      <SectionHeader
        title="Something Sweet"
        description="A little reminder of how I see you."
      />

      <Button size="lg" variant="default" onClick={generate}>
        Tell me something sweet
      </Button>

      <div className={`${card} mx-auto mt-8 flex min-h-[88px] max-w-lg items-center justify-center px-6 py-5`}>
        <AnimatePresence mode="wait">
          {compliment ? (
            <motion.p
              key={key}
              className="font-sans text-[15px] leading-relaxed text-rose-700/75"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              &ldquo;{compliment}&rdquo;
            </motion.p>
          ) : (
            <p className="font-sans text-sm text-rose-400/60">
              Press the button above ♥
            </p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
