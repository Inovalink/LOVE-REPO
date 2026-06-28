"use client";

import { motion } from "framer-motion";
import { LOADER_MESSAGES } from "@/lib/constants";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf9f7]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center gap-6">
        {LOADER_MESSAGES.map((message, index) => (
          <motion.p
            key={message}
            className="font-sans text-lg font-medium tracking-tight text-rose-800/70 text-center px-8 md:text-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, -8] }}
            transition={{
              duration: 1.6,
              delay: index * 1.6,
              times: [0, 0.2, 0.8, 1],
              ease: "easeInOut",
            }}
            onAnimationComplete={() => {
              if (index === LOADER_MESSAGES.length - 1) {
                setTimeout(onComplete, 300);
              }
            }}
          >
            {message}
          </motion.p>
        ))}

        <motion.div
          className="mt-2 h-px w-24 overflow-hidden bg-rose-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="h-full bg-rose-300"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
