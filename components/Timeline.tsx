"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TIMELINE_EVENTS } from "@/lib/data/timeline";
import { SectionHeader } from "@/components/SectionHeader";
import { FixedHeaderContext } from "@/components/SectionSlide";
import { useMobileNav } from "@/components/MobileNavContext";
import { useFixedSectionHeader } from "@/hooks/useFixedSectionHeader";
import { card, section } from "@/lib/styles";
import { cn } from "@/lib/utils";
import type { TimelineEvent } from "@/types";

const TIMELINE_HEADER = {
  eyebrow: "Our story",
  title: "Memory Timeline",
  description: "The moments that quietly became us.",
} as const;

function TimelineCard({
  event,
  isActive,
  compact = false,
  mobile = false,
}: {
  event: TimelineEvent;
  isActive?: boolean;
  compact?: boolean;
  mobile?: boolean;
}) {
  return (
    <div
      className={cn(
        card,
        "flex flex-col overflow-hidden p-0 transition-all duration-500",
        mobile
          ? "w-full shadow-[0_12px_40px_rgba(190,24,93,0.1)] ring-1 ring-rose-200/60"
          : cn(
              "w-[300px] md:w-[380px]",
              isActive
                ? "shadow-[0_16px_48px_rgba(190,24,93,0.12)] ring-1 ring-rose-200/60"
                : "shadow-[0_4px_20px_rgba(190,24,93,0.04)]"
            )
      )}
    >
      <div
        className={cn(
          "relative w-full shrink-0 overflow-hidden",
          mobile ? "h-36" : isActive ? "h-44 md:h-48" : "h-32 md:h-36"
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
          className={cn(
            "absolute right-2.5 top-2.5 flex items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm",
            mobile ? "h-7 w-7 text-sm" : "right-3 top-3 h-9 w-9 text-base"
          )}
          aria-hidden="true"
        >
          {event.icon}
        </span>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col",
          mobile ? "px-4 pb-4 pt-3.5" : "px-5 pb-5 pt-4"
        )}
      >
        <h3
          className={cn(
            "font-sans font-medium tracking-[-0.02em] text-rose-900",
            mobile ? "text-base" : isActive ? "text-xl" : "text-lg"
          )}
        >
          {event.title}
        </h3>
        <p
          className={cn(
            "font-sans leading-relaxed text-rose-600/70",
            mobile
              ? "mt-2 line-clamp-5 text-[12px] leading-[1.55]"
              : cn(
                  "mt-2.5",
                  compact || !isActive ? "line-clamp-3 text-xs" : "text-sm"
                )
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
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
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

function MobileTimelinePagination({
  activeMod,
  total,
  onSelect,
}: {
  activeMod: number;
  total: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-1.5">
        {TIMELINE_EVENTS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Go to memory ${i + 1}`}
            className={cn(
              "rounded-full transition-all duration-300",
              i === activeMod
                ? "h-1.5 w-5 bg-rose-400"
                : "h-1.5 w-1.5 bg-rose-200"
            )}
          />
        ))}
      </div>
      <p className="mt-1 text-center font-sans text-[10px] leading-none text-rose-400/90">
        {activeMod + 1} / {total}
      </p>
    </div>
  );
}

function MobileTimeline() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const mobileNav = useMobileNav();
  const total = TIMELINE_EVENTS.length;
  const activeMod = wrapIndex(active, total);

  useEffect(() => {
    document.documentElement.dataset.mobileSubnav = "timeline";
    return () => {
      delete document.documentElement.dataset.mobileSubnav;
    };
  }, []);

  const go = (dir: -1 | 1) => setActive((i) => i + dir);

  const selectIndex = (index: number) => {
    setActive((current) => {
      const currentMod = wrapIndex(current, total);
      const forward = (index - currentMod + total) % total;
      const backward = (currentMod - index + total) % total;
      return current + (forward <= backward ? forward : -backward);
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 36) return;
    go(delta < 0 ? 1 : -1);
  };

  const navBtn =
    "z-20 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rose-100 bg-white/95 text-rose-500 shadow-[0_2px_12px_rgba(190,24,93,0.08)] backdrop-blur-sm transition-transform active:scale-95";

  const subNavSlot = mobileNav?.subNavSlot;
  const pagination = (
    <MobileTimelinePagination
      activeMod={activeMod}
      total={total}
      onSelect={selectIndex}
    />
  );

  return (
    <>
      {subNavSlot && createPortal(pagination, subNavSlot)}

      <div className="flex w-full flex-1 items-center justify-center md:hidden">
        <div className="relative mx-auto w-full max-w-[340px] px-1">
          <button
            type="button"
            onClick={() => go(-1)}
            className={cn(navBtn, "absolute left-0 top-1/2 -translate-y-1/2")}
            aria-label="Previous memory"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => go(1)}
            className={cn(navBtn, "absolute right-0 top-1/2 -translate-y-1/2")}
            aria-label="Next memory"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div
            className="relative mx-auto min-h-[304px] w-full max-w-[260px] touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={activeMod}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-0 flex justify-center"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -48) go(1);
                  else if (info.offset.x > 48) go(-1);
                }}
              >
                <TimelineCard
                  event={TIMELINE_EVENTS[activeMod]}
                  isActive
                  mobile
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
  </>
  );
}

export function Timeline() {
  const useFixedHeader = useContext(FixedHeaderContext) !== null;

  useFixedSectionHeader(
    <SectionHeader
      {...TIMELINE_HEADER}
      className="mb-0 [&_h2]:text-xl [&_p]:mt-2 [&_p]:text-xs"
    />,
    []
  );

  return (
    <section className={cn(section, "max-md:flex max-md:min-h-full max-md:flex-col")}>
      <SectionHeader
        {...TIMELINE_HEADER}
        className={cn("mb-8 md:mb-10", useFixedHeader && "hidden md:block")}
      />

      <DesktopCarousel />
      <MobileTimeline />
    </section>
  );
}
