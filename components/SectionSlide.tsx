"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ContinueButton } from "@/components/ContinueButton";
import { PreviousButton } from "@/components/PreviousButton";
import { cn } from "@/lib/utils";

export const slideTransition = {
  duration: 1,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const slideVariants = {
  initial: {
    opacity: 0,
    scale: 0.97,
    filter: "blur(12px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: "blur(10px)",
  },
};

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
}: SectionSlideProps) {
  const hasNav = (showNext && onNext) || (showPrev && onPrev);

  return (
    <div className={cn("relative h-dvh w-full", className)}>
      {showPrev && onPrev && (
        <div className="absolute left-0 top-0 z-30 px-4 pt-5 md:px-6 md:pt-6">
          <PreviousButton onClick={onPrev} />
        </div>
      )}

      <div
        className={cn(
          "absolute inset-x-0 top-0 min-h-0 overflow-y-auto overscroll-y-contain px-6",
          scrollOnMobile
            ? "flex flex-col items-center justify-start touch-pan-y [-webkit-overflow-scrolling:touch] md:justify-center"
            : "flex items-center justify-center",
          hasNav ? "bottom-[108px]" : "bottom-8",
          showPrev && "pt-14 md:pt-16",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        )}
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

      {hasNav && (
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-[72px]">
          <div className="flex items-center justify-center">
            {showNext && onNext && (
              <ContinueButton
                onClick={onNext}
                label={nextLabel}
                className="pt-0 pb-0"
              />
            )}
          </div>
        </div>
      )}
    </div>
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
