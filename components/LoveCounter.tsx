"use client";

import { motion } from "framer-motion";
import { useLoveCounter } from "@/hooks/useLoveCounter";
import { card, section } from "@/lib/styles";

function CounterDigit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.span
        key={value}
        className="font-sans text-3xl font-medium tabular-nums tracking-tight text-rose-900 md:text-4xl"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {value.toString().padStart(2, "0")}
      </motion.span>
      <span className="font-sans text-[11px] uppercase tracking-wider text-rose-400/70">
        {label}
      </span>
    </div>
  );
}

export function LoveCounter() {
  const { days, hours, minutes, seconds } = useLoveCounter();

  return (
    <section className={section}>
      <div className={`${card} mx-auto max-w-lg px-8 py-10 md:py-12 text-center`}>
        <h2 className="mb-8 font-sans text-2xl font-medium tracking-tight text-rose-900 md:text-[1.75rem]">
          It&apos;s been months already
        </h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          <CounterDigit value={days} label="Days" />
          <CounterDigit value={hours} label="Hours" />
          <CounterDigit value={minutes} label="Minutes" />
          <CounterDigit value={seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
}
