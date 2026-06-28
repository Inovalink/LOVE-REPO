"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TIMELINE_EVENTS } from "@/lib/data/timeline";
import { SectionHeader } from "@/components/SectionHeader";
import { card, section } from "@/lib/styles";
import { cn } from "@/lib/utils";
import type { TimelineEvent } from "@/types";

function TimelineCard({
  event,
  isActive,
  compact = false,
}: {
  event: TimelineEvent;
  isActive?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        card,
        "flex w-[300px] flex-col overflow-hidden p-0 transition-all duration-500 md:w-[380px]",
        isActive
          ? "shadow-[0_16px_48px_rgba(190,24,93,0.12)] ring-1 ring-rose-200/60"
          : "shadow-[0_4px_20px_rgba(190,24,93,0.04)]"
      )}
    >
      <div
        className={cn(
          "relative w-full shrink-0 overflow-hidden",
          isActive ? "h-44 md:h-48" : "h-32 md:h-36"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            event.accent ?? "from-rose-50 via-pink-50 to-violet-50"
          )}
          aria-hidden="true"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image}
          alt=""
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            event.heroPosition ?? "object-center"
          )}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-white/55 via-white/5 to-white/10"
          aria-hidden="true"
        />
        <span
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-base shadow-sm backdrop-blur-sm"
          aria-hidden="true"
        >
          {event.icon}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3
          className={cn(
            "font-sans font-medium tracking-[-0.02em] text-rose-900",
            isActive ? "text-xl" : "text-lg"
          )}
        >
          {event.title}
        </h3>
        <p
          className={cn(
            "mt-2.5 font-sans leading-relaxed text-rose-600/70",
            compact || !isActive ? "line-clamp-3 text-xs" : "text-sm"
          )}
        >
          {event.description}
        </p>
      </div>
    </div>
  );
}

const VISIBLE_RADIUS = 5;

function wrapIndex(index: number, total: number) {
  return ((index % total) + total) % total;
}

function DesktopCarousel() {
  const [active, setActive] = useState(0);
  const wheelLock = useRef(false);
  const total = TIMELINE_EVENTS.length;
  const activeMod = wrapIndex(active, total);

  const go = (dir: -1 | 1) => {
    setActive((i) => i + dir);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    if (wheelLock.current) return;

    const delta =
      Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(delta) < 12) return;

    wheelLock.current = true;
    go(delta > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLock.current = false;
    }, 420);
  };

  return (
    <div
      className="relative mx-auto hidden max-w-5xl md:block"
      onWheel={handleWheel}
    >
      {/* Vanishing edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-28 bg-gradient-to-r from-[#faf9f7] via-[#faf9f7]/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-28 bg-gradient-to-l from-[#faf9f7] via-[#faf9f7]/80 to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex h-[500px] items-center justify-center overflow-hidden md:h-[520px]">
        {Array.from({ length: VISIBLE_RADIUS * 2 + 1 }, (_, j) => {
          const virtualIndex = active - VISIBLE_RADIUS + j;
          const offset = virtualIndex - active;
          const distance = Math.abs(offset);
          const event = TIMELINE_EVENTS[wrapIndex(virtualIndex, total)];
          const scale = Math.max(0.62, 1 - distance * 0.14);
          const opacity = Math.max(0.2, 1 - distance * 0.32);
          const blur = distance > 0 ? Math.min(distance * 1.2, 3) : 0;
          const isCenter = offset === 0;

          return (
            <motion.button
              key={virtualIndex}
              type="button"
              onClick={() => setActive(virtualIndex)}
              className="absolute cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
              animate={{
                x: offset * 320,
                scale,
                opacity,
                zIndex: 10 - distance,
                filter: `blur(${blur}px)`,
              }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              aria-label={`View memory: ${event.title}`}
              aria-current={isCenter ? "true" : undefined}
            >
              <TimelineCard event={event} isActive={isCenter} />
            </motion.button>
          );
        })}
      </div>

      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Previous memory"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-rose-100 bg-white/80 text-rose-500 transition-colors hover:bg-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex gap-1.5">
          {TIMELINE_EVENTS.map((_, i) => (
            <button
              key={i}
              onClick={() =>
                setActive((current) => {
                  const currentMod = wrapIndex(current, total);
                  const forward = (i - currentMod + total) % total;
                  const backward = (currentMod - i + total) % total;
                  return current + (forward <= backward ? forward : -backward);
                })
              }
              aria-label={`Go to memory ${i + 1}`}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                i === activeMod
                  ? "w-5 bg-rose-400"
                  : "w-1 bg-rose-200 hover:bg-rose-300"
              )}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Next memory"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-rose-100 bg-white/80 text-rose-500 transition-colors hover:bg-white"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function MobileTimeline() {
  const [active, setActive] = useState(0);
  const total = TIMELINE_EVENTS.length;
  const activeMod = wrapIndex(active, total);

  return (
    <div className="md:hidden">
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <TimelineCard event={TIMELINE_EVENTS[activeMod]} isActive />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          onClick={() => setActive((i) => i - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-rose-100 bg-white/80 text-rose-500"
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-sans text-xs text-rose-400">
          {activeMod + 1} / {total}
        </span>
        <button
          onClick={() => setActive((i) => i + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-rose-100 bg-white/80 text-rose-500"
          aria-label="Next"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function Timeline() {
  return (
    <section className={section}>
      <SectionHeader
        eyebrow="Our story"
        title="Memory Timeline"
        description="The moments that quietly became us."
        className="mb-8 md:mb-10"
      />

      <DesktopCarousel />
      <MobileTimeline />
    </section>
  );
}
