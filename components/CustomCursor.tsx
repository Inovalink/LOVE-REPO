"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Sparkle } from "@/types";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [visible, setVisible] = useState(false);

  const addSparkle = useCallback((x: number, y: number) => {
    const sparkle: Sparkle = { id: Date.now(), x, y };
    setSparkles((prev) => [...prev.slice(-8), sparkle]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id));
    }, 600);
  }, []);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch || window.innerWidth < 768) return;

    setVisible(true);
    document.body.style.cursor = "none";

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("button, a, [role='button'], input, [data-cursor-hover]")
      );
    };

    const handleClick = (e: MouseEvent) => {
      addSparkle(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("click", handleClick);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("click", handleClick);
    };
  }, [addSparkle]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[200] pointer-events-none text-rose-400"
        animate={{
          x: position.x - (hovering ? 14 : 8),
          y: position.y - (hovering ? 14 : 8),
          scale: hovering ? 1.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        aria-hidden="true"
      >
        ♥
      </motion.div>

      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            className="fixed z-[200] pointer-events-none text-rose-300 text-xs"
            style={{ left: s.x, top: s.y }}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 2, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            ✨
          </motion.span>
        ))}
      </AnimatePresence>
    </>
  );
}
