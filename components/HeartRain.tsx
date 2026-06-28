"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { randomBetween } from "@/lib/utils";

interface FallingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
}

export function HeartRain() {
  const [hearts, setHearts] = useState<FallingHeart[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const heart: FallingHeart = {
          id: Date.now() + Math.random(),
          x: randomBetween(5, 95),
          size: randomBetween(10, 18),
          duration: randomBetween(4, 7),
        };
        setHearts((prev) => [...prev.slice(-8), heart]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10" aria-hidden="true">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.span
            key={heart.id}
            className="absolute text-rose-300/50"
            style={{ left: `${heart.x}%`, fontSize: heart.size }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: "100vh", opacity: [0, 0.6, 0.6, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: heart.duration, ease: "linear" }}
            onAnimationComplete={() =>
              setHearts((prev) => prev.filter((h) => h.id !== heart.id))
            }
          >
            ♥
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
