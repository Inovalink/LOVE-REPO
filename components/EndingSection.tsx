"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeartAnimation } from "@/components/HeartAnimation";
import { section } from "@/lib/styles";

interface EndingSectionProps {
  onRestart: () => void;
}

export function EndingSection({ onRestart }: EndingSectionProps) {
  return (
    <section className={`${section} text-center`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <HeartAnimation className="mx-auto mb-8" />
      </motion.div>

      <motion.h2
        className="font-sans text-2xl font-medium tracking-tight text-rose-900 md:text-3xl"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Forever and always
        <span className="ml-1.5 text-rose-400">♥</span>
      </motion.h2>

      <motion.p
        className="mx-auto mt-3 max-w-xs font-sans text-sm text-rose-500/70"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35 }}
      >
        Thank you for being you.
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <Button size="lg" variant="outline" onClick={onRestart}>
          Restart our story
        </Button>
      </motion.div>
    </section>
  );
}
