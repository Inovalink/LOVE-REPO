"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader } from "@/components/Loader";
import { CodeEntry } from "@/components/CodeEntry";
import { UnlockTransition } from "@/components/UnlockTransition";
import { MainExperience } from "@/components/MainExperience";
import { MusicPlayer } from "@/components/MusicPlayer";
import { MobileNavProvider } from "@/components/MobileNavContext";
import type { AppPhase } from "@/types";

export default function Home() {
  const [phase, setPhase] = useState<AppPhase>("loading");
  const [musicAutostart, setMusicAutostart] = useState(false);

  const handleRestart = useCallback(() => {
    setPhase("loading");
    setMusicAutostart(false);
  }, []);

  const handleCodeSuccess = useCallback(() => {
    setMusicAutostart(true);
    setPhase("unlock");
  }, []);

  const handleUnlockComplete = useCallback(() => {
    setPhase("main");
  }, []);

  return (
    <MobileNavProvider>
      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <Loader key="loader" onComplete={() => setPhase("code")} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="sync">
        {phase === "code" && (
          <CodeEntry key="code" onSuccess={handleCodeSuccess} />
        )}
      </AnimatePresence>

      {(phase === "unlock" || phase === "main") && (
        <MainExperience key="main" isInitialEnter onRestart={handleRestart} />
      )}

      {phase !== "loading" && <MusicPlayer autostart={musicAutostart} />}

      <AnimatePresence>
        {phase === "unlock" && (
          <UnlockTransition key="unlock" onComplete={handleUnlockComplete} />
        )}
      </AnimatePresence>
    </MobileNavProvider>
  );
}
