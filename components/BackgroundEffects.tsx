"use client";

import { motion } from "framer-motion";

export function BackgroundEffects() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[#faf9f7]" />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 15% 0%, rgba(253,242,244,0.7) 0%, transparent 55%),
            radial-gradient(ellipse 60% 45% at 90% 10%, rgba(245,240,250,0.5) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 50% 100%, rgba(254,242,244,0.4) 0%, transparent 55%)
          `,
        }}
      />

      <motion.div
        className="absolute left-[20%] top-[15%] h-64 w-64 rounded-full bg-rose-100/40 blur-[100px]"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[15%] top-[40%] h-48 w-48 rounded-full bg-lavender-50/60 blur-[80px]"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}
