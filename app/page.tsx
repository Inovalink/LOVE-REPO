"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader } from "@/components/Loader";
import { CodeEntry } from "@/components/CodeEntry";
import { UnlockTransition } from "@/components/UnlockTransition";
import { MainExperience } from "@/components/MainExperience";
import type { AppPhase } from "@/types";

export default function Home() {
  const [phase, setPhase] = useState<AppPhase>("loading");

  const handleRestart = useCallback(() => {
    setPhase("loading");
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <Loader key="loader" onComplete={() => setPhase("code")} />
        )}
      </AnimatePresence>

      {phase === "code" && (
        <CodeEntry onSuccess={() => setPhase("unlock")} />
      )}

      {phase === "unlock" && (
        <UnlockTransition onComplete={() => setPhase("main")} />
      )}

      {phase === "main" && <MainExperience onRestart={handleRestart} />}
    </>
  );
}
