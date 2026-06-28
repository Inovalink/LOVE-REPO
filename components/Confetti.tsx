"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { randomBetween } from "@/lib/utils";

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  type: "heart" | "petal";
  size: number;
}

interface ConfettiProps {
  active: boolean;
}

export function Confetti({ active }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;

    const newParticles: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: randomBetween(10, 90),
      y: randomBetween(-10, 30),
      rotation: randomBetween(0, 360),
      type: Math.random() > 0.5 ? "heart" : "petal",
      size: randomBetween(10, 18),
    }));

    setParticles(newParticles);
    const timer = setTimeout(() => setParticles([]), 5000);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-30" aria-hidden="true">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute select-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: p.size,
              color: p.type === "heart" ? "#f9a8d4" : undefined,
            }}
            initial={{ opacity: 0, y: 0, rotate: p.rotation }}
            animate={{
              opacity: [0, 0.8, 0.6, 0],
              y: [0, 200, 500],
              x: [0, randomBetween(-50, 50), randomBetween(-80, 80)],
              rotate: p.rotation + randomBetween(180, 540),
            }}
            transition={{ duration: randomBetween(3, 5), ease: "easeOut" }}
          >
            {p.type === "heart" ? "♥" : "🌸"}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
