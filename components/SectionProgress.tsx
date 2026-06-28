"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProgressProps {
  current: number;
  total: number;
  className?: string;
}

export function SectionProgress({
  current,
  total,
  className,
}: SectionProgressProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-1.5",
        className
      )}
      aria-hidden="true"
    >
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="h-1 rounded-full bg-rose-200"
          animate={{
            width: i === current ? 20 : 4,
            opacity: i === current ? 1 : i < current ? 0.5 : 0.25,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}
