"use client";

import { createContext, ReactNode, useLayoutEffect, useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ContinueButton } from "@/components/ContinueButton";
import { PreviousButton } from "@/components/PreviousButton";
import { useMobileNav } from "@/components/MobileNavContext";
import { cn } from "@/lib/utils";
import { slideVariants, MOTION } from "@/lib/motion";

export const FixedHeaderContext = createContext<
  ((header: ReactNode) => void) | null
>(null);

export const slideTransition = MOTION.enter;

interface SectionSlideProps {
  children: ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
  nextLabel?: string;
  showNext?: boolean;
  showPrev?: boolean;
  className?: string;
  contentClassName?: string;
  /** Top-aligned scroll on small screens (long letter, reasons list) */
  scrollOnMobile?: boolean;
  /** Pin section title under the back button on mobile (timeline, etc.) */
  fixedHeaderOnMobile?: boolean;
}

export function SectionSlide({
  children,
  onNext,
  onPrev,
  nextLabel,
  showNext = true,
  showPrev = false,
  className,
  contentClassName,
  scrollOnMobile = false,
  fixedHeaderOnMobile = false,
}: SectionSlideProps) {
  const hasNav = (showNext && onNext) || (showPrev && onPrev);
  const hasContinue = showNext && !!onNext;
  const useFixedHeaderLayout = scrollOnMobile || fixedHeaderOnMobile;
  const [fixedHeader, setFixedHeader] = useState<ReactNode>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const mobileNav = useMobileNav();

  useEffect(() => {
    return () => mobileNav?.setMusicSlot(null);
  }, [mobileNav]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setHeaderScrolled(el.scrollTop > 6);
  }, []);

  useLayoutEffect(() => {
    if (!useFixedHeaderLayout || !fixedHeader || !headerRef.current) {
      setHeaderHeight(0);
      return;
    }

    const node = headerRef.current;
    const update = () => setHeaderHeight(node.offsetHeight);

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [useFixedHeaderLayout, fixedHeader]);

  const scrollTop =
    useFixedHeaderLayout && fixedHeader && headerHeight > 0
      ? headerHeight
      : 0;

  return (
    <FixedHeaderContext.Provider
      value={useFixedHeaderLayout ? setFixedHeader : null}
    >
    <div className={cn("relative h-dvh w-full", className)}>
      {showPrev && onPrev && (
        <div className="fixed left-4 top-5 z-40 hidden md:block md:left-6 md:top-6">
          <PreviousButton onClick={onPrev} />
        </div>
      )}

      <div className="fixed inset-x-0 bottom-10 z-40 flex h-10 items-center justify-between gap-2 px-4 md:hidden">
        <div className="flex w-10 shrink-0 items-center justify-start">
          {showPrev && onPrev && (
            <PreviousButton onClick={onPrev} iconOnly />
          )}
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center px-1">
          {hasContinue && onNext && (
            <ContinueButton
              onClick={onNext}
              label={nextLabel}
              className="pt-0 pb-0 [&_button]:max-w-full [&_button]:truncate [&_button]:px-3.5 [&_button]:text-[12px]"
            />
          )}
        </div>
        <div
          ref={mobileNav?.setMusicSlot}
          className="flex w-10 shrink-0 items-center justify-end"
        />
      </div>

      {useFixedHeaderLayout && fixedHeader && (
        <div
          ref={headerRef}
          className={cn(
            "absolute inset-x-0 top-0 z-30 bg-cream/95 backdrop-blur-sm",
            "pt-5 pb-3 md:pt-6 md:pb-4",
            fixedHeaderOnMobile && "md:hidden",
            headerScrolled && scrollOnMobile && "border-b border-rose-100/40"
          )}
        >
          <div className="mx-auto w-full max-w-2xl px-4 text-center md:hidden">
            {fixedHeader}
          </div>
          <div className="mx-auto hidden w-full max-w-2xl px-6 text-center md:block">
            {fixedHeader}
          </div>
        </div>
      )}

      {scrollOnMobile && fixedHeader && headerHeight > 0 && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 z-[21] h-12 md:h-14"
          style={{ top: headerHeight }}
          initial={false}
          animate={{ opacity: headerScrolled ? 1 : 0 }}
          transition={MOTION.fast}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-cream from-20% via-cream/85 via-55% to-transparent" />
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background:
                "radial-gradient(ellipse 80% 120% at 50% 0%, var(--cream) 0%, transparent 72%)",
            }}
          />
        </motion.div>
      )}

      <div
        ref={scrollRef}
        onScroll={scrollOnMobile && fixedHeader ? handleScroll : undefined}
        className={cn(
          "absolute inset-x-0 min-h-0 px-6",
          scrollOnMobile
            ? "overflow-y-auto overscroll-y-contain overflow-anchor-none flex flex-col items-center justify-start touch-pan-y [-webkit-overflow-scrolling:touch] md:justify-center"
            : fixedHeaderOnMobile
              ? "max-md:overflow-hidden max-md:flex max-md:items-start max-md:justify-center max-md:pt-1 md:flex md:items-center md:justify-center"
              : "flex items-center justify-center",
          hasContinue ? "max-md:bottom-[6.5rem] md:bottom-[108px]" : "max-md:bottom-[5rem] md:bottom-8",
          !scrollOnMobile && "top-0",
          scrollOnMobile && !fixedHeader && "top-0",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        )}
        style={scrollTop > 0 ? { top: scrollTop } : undefined}
      >
        <div
          className={cn(
            "mx-auto w-full max-w-2xl py-4",
            scrollOnMobile && "pb-6 md:pb-4",
            contentClassName
          )}
        >
          {children}
        </div>
      </div>

      {hasContinue && (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[9] h-48 md:h-52"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-cream from-15% via-cream/90 via-45% to-transparent" />
            <div
              className="absolute inset-x-0 bottom-0 h-full opacity-85"
              style={{
                background:
                  "radial-gradient(ellipse 85% 110% at 50% 100%, var(--cream) 0%, transparent 78%)",
              }}
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 hidden px-6 pb-[72px] md:block">
            <div className="flex items-center justify-center">
              <ContinueButton
                onClick={onNext!}
                label={nextLabel}
                className="pt-0 pb-0"
              />
            </div>
          </div>
        </>
      )}
    </div>
    </FixedHeaderContext.Provider>
  );
}

export function SlideWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0 z-20 h-dvh w-full"
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={slideTransition}
    >
      {children}
    </motion.div>
  );
}
