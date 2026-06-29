"use client";

import { useState, useEffect, useCallback, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LOVE_LETTER_PARAGRAPHS } from "@/lib/data/letter";
import { section } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { FixedHeaderContext } from "@/components/SectionSlide";
import { useFixedSectionHeader } from "@/hooks/useFixedSectionHeader";

const ALL_LINES = [...LOVE_LETTER_PARAGRAPHS];
const NAME_MARKER = "Rosavelle Neue";

function renderClosingBlock(text: string) {
  const idx = text.indexOf(NAME_MARKER);
  let before = idx === -1 ? text : text.slice(0, idx).trim();
  before = before.replace(/,?\s*my\s*$/i, ",");
  const after = idx === -1 ? "" : text.slice(idx + NAME_MARKER.length).trim();

  return (
    <div className="mt-2 border-t border-rose-100/90 pt-6 text-center">
      <p className="font-sans text-[15px] leading-relaxed text-rose-600/80 md:text-base">
        {before}
      </p>
      <p className="mt-3 font-aquarelle text-[clamp(2rem,7vw,2.75rem)] leading-none text-rose-900">
        {NAME_MARKER}
      </p>
      {after && (
        <p className="mt-3 font-sans text-lg text-rose-400/90">{after}</p>
      )}
    </div>
  );
}

function EnvelopeHeader({ isOpened }: { isOpened: boolean }) {
  return (
    <header className="text-center">
      <div className="relative mx-auto min-h-[5.5rem] w-full max-w-sm md:min-h-[5.75rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isOpened ? "opened" : "closed"}
            className="absolute inset-x-0 top-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className={cn(
                "font-sans text-[1.75rem] font-semibold leading-tight text-rose-900 md:text-[2.125rem]",
                isOpened
                  ? "uppercase tracking-[0.04em]"
                  : "tracking-[-0.02em]"
              )}
            >
              {isOpened ? "A Letter from your love" : "A Note for you"}
            </h2>
            <p
              className={cn(
                "mx-auto mt-2 max-w-xs font-sans leading-relaxed text-rose-500/80 md:mt-3",
                isOpened
                  ? "text-[11px] uppercase tracking-[0.22em]"
                  : "text-sm"
              )}
            >
              {isOpened ? "Enjoy while you read" : "Open it when you are ready"}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </header>
  );
}

function useLineByLineReveal(lines: string[], active: boolean, lineDelay = 1100) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    setRevealedCount(0);
    setDone(false);
  }, [active, lines]);

  useEffect(() => {
    if (!active || done) return;

    if (revealedCount >= lines.length) {
      setDone(true);
      return;
    }

    const delay = revealedCount === 0 ? 280 : lineDelay;
    const timer = setTimeout(() => {
      setRevealedCount((c) => c + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [active, revealedCount, done, lines, lineDelay]);

  return {
    revealedCount,
    isComplete: done,
    isRevealing: active && !done,
  };
}

function EnvelopeGraphic({
  isOpen,
  onOpen,
}: {
  isOpen: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.button
      onClick={onOpen}
      disabled={isOpen}
      className="group relative mx-auto block cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 focus-visible:ring-offset-4"
      aria-label="Open love letter"
      whileHover={!isOpen ? { y: -3 } : {}}
      whileTap={!isOpen ? { scale: 0.98 } : {}}
      style={{ perspective: 900 }}
    >
      <div className="absolute -bottom-3 left-1/2 h-4 w-[85%] -translate-x-1/2 rounded-[100%] bg-rose-200/30 blur-md transition-opacity group-hover:opacity-80" />

      <motion.div
        className="relative h-[200px] w-[300px] md:h-[220px] md:w-[340px]"
        style={{ transformStyle: "preserve-3d" }}
        animate={isOpen ? { y: -6, scale: 0.98 } : { y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 rounded-2xl border border-rose-100/90 bg-gradient-to-b from-white to-rose-50/60 shadow-[0_12px_40px_rgba(190,24,93,0.08)]" />

        <div
          className="absolute inset-x-0 bottom-0 h-[55%] rounded-b-2xl bg-gradient-to-t from-rose-50/90 to-white/80"
          style={{ clipPath: "polygon(0 100%, 50% 12%, 100% 100%)" }}
        />

        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="absolute left-4 right-4 top-6 h-[72%] rounded-t-lg border border-rose-100/60 bg-[#fffdf9] shadow-sm"
              initial={{ y: 8 }}
              animate={{ y: [8, 4, 8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              exit={{ y: -120, opacity: 0 }}
            />
          )}
        </AnimatePresence>

        <div
          className="absolute inset-x-0 bottom-0 h-[48%] rounded-b-2xl border-t border-rose-100/50 bg-gradient-to-b from-white/90 to-rose-50/70"
          style={{ clipPath: "polygon(0 0, 50% 38%, 100% 0, 100% 100%, 0 100%)" }}
        />

        <motion.div
          className="absolute inset-x-0 top-0 z-10 h-[52%] origin-top"
          style={{
            transformStyle: "preserve-3d",
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
          }}
          animate={isOpen ? { rotateX: 180, y: -2 } : { rotateX: 0, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-full w-full rounded-t-2xl border border-rose-100/80 bg-gradient-to-b from-rose-50 to-rose-100/70 shadow-[inset_0_-1px_0_rgba(255,255,255,0.8)]" />
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-[46%] z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose-300 to-rose-400 shadow-[0_4px_12px_rgba(244,114,182,0.35)]"
          animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, delay: isOpen ? 0.1 : 0 }}
        >
          <span className="text-sm text-white">♥</span>
        </motion.div>

        {!isOpen && (
          <motion.p
            className="absolute bottom-4 left-0 right-0 z-30 text-center font-sans text-[11px] tracking-wide text-rose-400/70"
            animate={{ opacity: [0.45, 0.85, 0.45] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Tap to open
          </motion.p>
        )}
      </motion.div>
    </motion.button>
  );
}

function LetterPaper({ revealedCount }: { revealedCount: number }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-rose-100/90 bg-[#fffdf9] shadow-[0_16px_48px_rgba(190,24,93,0.07)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 27px, rgba(251,207,232,0.35) 27px, rgba(251,207,232,0.35) 28px)",
          backgroundPositionY: "56px",
        }}
      />

      <div className="relative px-6 py-8 md:px-12 md:py-10">
        <div className="space-y-5 md:space-y-6">
          {LOVE_LETTER_PARAGRAPHS.map((paragraph, i) => {
            const isClosing = i === LOVE_LETTER_PARAGRAPHS.length - 1;
            const revealed = i < revealedCount;

            return (
              <div key={i} className="min-h-0">
                <motion.div
                  initial={false}
                  animate={{ opacity: revealed ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(!revealed && "pointer-events-none select-none")}
                  aria-hidden={!revealed}
                >
                  {isClosing ? (
                    renderClosingBlock(paragraph)
                  ) : (
                    <p className="text-left font-sans text-[14px] leading-[1.75] text-rose-700/85 md:text-[15px]">
                      {paragraph}
                    </p>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const OPEN_FLAP_MS = 700;
const ENVELOPE_VANISH_MS = 400;

export function Envelope() {
  const [phase, setPhase] = useState<
    "closed" | "opening" | "vanishing" | "letter"
  >("closed");
  const [writeActive, setWriteActive] = useState(false);

  const handleOpen = useCallback(() => {
    if (phase !== "closed") return;
    setPhase("opening");
    window.setTimeout(() => setPhase("vanishing"), OPEN_FLAP_MS);
    window.setTimeout(() => {
      setPhase("letter");
      setWriteActive(true);
    }, OPEN_FLAP_MS + ENVELOPE_VANISH_MS);
  }, [phase]);

  const { revealedCount } = useLineByLineReveal(ALL_LINES, writeActive);

  const letterVisible = phase === "letter";
  const useFixedHeader = useContext(FixedHeaderContext) !== null;

  useFixedSectionHeader(
    <EnvelopeHeader isOpened={letterVisible} />,
    [letterVisible]
  );

  return (
    <section
      className={cn(
        section,
        useFixedHeader && "w-full",
        useFixedHeader &&
          !letterVisible &&
          "max-md:flex max-md:min-h-[60svh] max-md:flex-col max-md:items-center max-md:justify-center",
        useFixedHeader && letterVisible && "max-md:w-full"
      )}
    >
      {!useFixedHeader ? (
        <div className="mb-6 md:mb-8">
          <EnvelopeHeader isOpened={letterVisible} />
        </div>
      ) : (
        <div className="mb-6 hidden md:block">
          <EnvelopeHeader isOpened={letterVisible} />
        </div>
      )}

      <div className="mx-auto w-full">
        {!letterVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              phase === "vanishing"
                ? { opacity: 0, scale: 0.82, y: -28, filter: "blur(6px)" }
                : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
            }
            transition={{
              duration: phase === "vanishing" ? ENVELOPE_VANISH_MS / 1000 : 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex justify-center"
          >
            <EnvelopeGraphic
              isOpen={phase === "opening" || phase === "vanishing"}
              onOpen={handleOpen}
            />
          </motion.div>
        )}

        {letterVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="max-md:pt-1"
          >
            <LetterPaper revealedCount={revealedCount} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
