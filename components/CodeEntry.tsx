"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SECRET_CODE } from "@/lib/constants";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { cn } from "@/lib/utils";

interface CodeEntryProps {
  onSuccess: () => void;
}

function WaitingDots() {
  return (
    <span className="inline-flex w-6" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="text-rose-800"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.22,
            ease: "easeInOut",
          }}
        >
          .
        </motion.span>
      ))}
    </span>
  );
}

export function CodeEntry({ onSuccess }: CodeEntryProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === SECRET_CODE.toUpperCase()) {
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  const canSubmit = code.trim().length > 0;

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center px-5 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <BackgroundEffects />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(253,242,248,0.15)_55%,rgba(244,114,182,0.08)_100%)]" />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-200/25 blur-[90px]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-[400px]"
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={
          shake
            ? { x: [-14, 14, -10, 10, -5, 5, 0], y: 0, opacity: 1, scale: 1 }
            : { opacity: 1, y: 0, scale: 1, x: 0 }
        }
        transition={
          shake
            ? { duration: 0.5 }
            : { duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-[28px]",
              "border border-white/60 bg-white/45 backdrop-blur-2xl",
              "shadow-[0_1px_1px_rgba(255,255,255,0.8)_inset,0_8px_32px_rgba(190,24,93,0.06),0_24px_64px_rgba(244,114,182,0.14)]",
              error && "border-rose-300/50 shadow-[0_24px_64px_rgba(244,114,182,0.22)]"
            )}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/50 to-transparent"
              aria-hidden="true"
            />

            <div className="relative px-7 pb-7 pt-8 sm:px-8 sm:pb-8 sm:pt-9">
              <div className="mb-7 flex justify-center">
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-rose-300/30 blur-md"
                    animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/70 bg-gradient-to-br from-white/80 to-rose-50/90 shadow-[0_4px_24px_rgba(244,114,182,0.18)]"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.35 }}
                  >
                    <motion.div
                      animate={{ y: [0, -1.5, 0] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Lock
                        className="h-[26px] w-[26px] text-rose-400/90"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              <div className="mb-8 text-center">
                <motion.h1
                  className="font-sans text-[1.65rem] font-medium leading-snug tracking-[-0.02em] text-rose-950 sm:text-[1.85rem]"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}
                >
                  Something&apos;s Waiting
                  <WaitingDots />
                </motion.h1>
                <motion.p
                  className="mx-auto mt-3.5 max-w-[280px] font-sans text-[13px] leading-[1.65] tracking-[0.01em] text-rose-600/65 sm:text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
                >
                  This was left here for one person. If that&apos;s you — you&apos;ll
                  know what to do.
                </motion.p>
              </div>

              <motion.div
                className="mx-auto mb-7 h-px w-12 bg-gradient-to-r from-transparent via-rose-300/50 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.8 }}
              />

              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.6 }}
                  className="relative"
                >
                  <Input
                    type="text"
                    placeholder="You know what to enter..."
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setError(false);
                    }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    aria-label="Secret code"
                    autoComplete="off"
                    spellCheck={false}
                    className={cn(
                      "h-[52px] rounded-2xl border-white/70 bg-white/55 text-center text-[15px] tracking-[0.12em] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]",
                      "placeholder:tracking-normal placeholder:text-rose-400/55",
                      "focus:border-rose-300/80 focus:bg-white/70 focus:shadow-[0_0_0_4px_rgba(251,207,232,0.35),inset_0_1px_2px_rgba(255,255,255,0.8)]",
                      error &&
                        "border-rose-300/80 focus:shadow-[0_0_0_4px_rgba(251,207,232,0.45),inset_0_1px_2px_rgba(255,255,255,0.8)]"
                    )}
                  />
                  <AnimatePresence>
                    {focused && !error && (
                      <motion.div
                        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-rose-200/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>

                <AnimatePresence mode="wait">
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -6, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -6, height: 0 }}
                      className="overflow-hidden text-center text-[13px] text-rose-500/90"
                      role="alert"
                    >
                      Not quite — try again.
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.95, duration: 0.6 }}
                >
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className={cn(
                      "relative h-[52px] w-full overflow-hidden rounded-2xl text-[15px] font-medium tracking-wide",
                      "bg-gradient-to-b from-rose-300 to-rose-400",
                      "shadow-[0_4px_14px_rgba(244,114,182,0.35),inset_0_1px_0_rgba(255,255,255,0.35)]",
                      "hover:shadow-[0_6px_20px_rgba(244,114,182,0.45),inset_0_1px_0_rgba(255,255,255,0.35)]",
                      "disabled:from-rose-200 disabled:to-rose-200 disabled:shadow-none disabled:text-white/70"
                    )}
                    size="lg"
                  >
                    <span className="relative z-10">Continue</span>
                    {canSubmit && (
                      <motion.span
                        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
