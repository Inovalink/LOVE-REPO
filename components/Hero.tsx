"use client";

import { motion } from "framer-motion";
import { HeartAnimation } from "@/components/HeartAnimation";

import { MOTION } from "@/lib/motion";

export function Hero() {
  return (
    <div className="relative px-2 text-center">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(253,242,244,0.95)_0%,rgba(245,240,250,0.35)_42%,transparent_72%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <motion.h1
          className="font-aquarelle text-[clamp(2.5rem,10vw,4.5rem)] leading-[1.05] tracking-[0.02em] text-rose-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, ...MOTION.medium }}
        >
          I Love You My Rosavelle Neue
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-[19rem] font-sans text-[15px] leading-[1.7] text-rose-600/55 md:max-w-sm md:text-base"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, ...MOTION.stagger }}
        >
          It&apos;s only been months, but you&apos;ve already changed everything.
          I made this just for you — take your time.
        </motion.p>

        <motion.div
          className="mt-11 flex justify-center md:mt-12"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.42, ...MOTION.stagger }}
        >
          <HeartAnimation />
        </motion.div>
      </div>
    </div>
  );
}
