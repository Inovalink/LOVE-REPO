"use client";

import { useEffect, useState } from "react";

export function useEasterEgg(onReveal: () => void) {
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        onReveal();
        return;
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : "";
      if (!key) return;

      setBuffer((prev) => {
        const next = (prev + key).slice(-11);
        if (next.includes("i love you")) {
          onReveal();
          return "";
        }
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onReveal]);
}
