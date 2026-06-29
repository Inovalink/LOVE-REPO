"use client";

import {
  createContext,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import { ContinueButton } from "@/components/ContinueButton";
import { PreviousButton } from "@/components/PreviousButton";
import { cn } from "@/lib/utils";
import { slideVariants, MOTION } from "@/lib/motion";

export const FixedHeaderContext = createContext<
  ((header: ReactNode) => void) | null
>(null);

export const slideTransition = MOTION.enter;

function VanishingFade({
  edge,
  className,
}: {
  edge: "top" | "bottom";
  className?: string;
}) {
  const isTop = edge === "top";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 z-10 h-12 md:h-14",
        isTop ? "top-0" : "bottom-0",
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-0",
          isTop
            ? "bg-gradient-to-b from-cream from-20% via-cream/85 via-55% to-transparent"
            : "bg-gradient-to-t from-cream from-15% via-cream/90 via-45% to-transparent"
        )}
      />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: isTop
            ? "radial-gradient(ellipse 80% 120% at 50% 0%, var(--cream) 0%, transparent 72%)"
            : "radial-gradient(ellipse 85% 110% at 50% 100%, var(--cream) 0%, transparent 78%)",
        }}
      />
    </div>
  );
}

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
  const hasContinue = showNext && !!onNext;
  const useFixedHeaderLayout = scrollOnMobile || fixedHeaderOnMobile;
  const [fixedHeader, setFixedHeader] = useState<ReactNode>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);

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

  const desktopScrollTop =
    !scrollOnMobile && useFixedHeaderLayout && fixedHeader && headerHeight > 0
      ? headerHeight
      : 0;

  return (
    <FixedHeaderContext.Provider
      value={useFixedHeaderLayout ? setFixedHeader : null}
    >
      <div
        className={cn(
          "relative app-viewport-h w-full",
          scrollOnMobile && "max-md:flex max-md:flex-col max-md:overflow-hidden",
          className
        )}
      >
        {showPrev && onPrev && (
          <div className="fixed left-4 top-5 z-40 hidden md:block md:left-6 md:top-6">
            <PreviousButton onClick={onPrev} />
          </div>
        )}

        {useFixedHeaderLayout && fixedHeader && (
          <div
            ref={headerRef}
            className={cn(
              "z-30 bg-cream/95 backdrop-blur-sm",
              scrollOnMobile
                ? "max-md:relative max-md:shrink-0 pt-safe pb-3 md:absolute md:inset-x-0 md:top-0 md:pt-6 md:pb-4"
                : "absolute inset-x-0 top-0 pt-safe pb-3 md:pt-6 md:pb-4",
              (fixedHeaderOnMobile || scrollOnMobile) && "md:hidden",
              headerScrolled && scrollOnMobile && "max-md:border-b max-md:border-rose-100/40"
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

        {scrollOnMobile && fixedHeader && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 z-[21] hidden h-12 md:block md:h-14"
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

        {/* Mobile bottom vanishing point above dock */}
        <div
          className="pointer-events-none fixed inset-x-0 z-[9] h-32 md:hidden"
          style={{ bottom: "var(--mobile-dock-h)" }}
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

        <div
          className={cn(
            scrollOnMobile && "relative max-md:flex-1 max-md:min-h-0"
          )}
        >
          <div
            ref={scrollRef}
            data-scroll-area={scrollOnMobile ? "true" : undefined}
            onScroll={scrollOnMobile ? handleScroll : undefined}
            className={cn(
              "min-h-0 px-6",
              scrollOnMobile
                ? "max-md:h-full max-md:overflow-y-auto max-md:overscroll-y-contain max-md:[touch-action:pan-y] max-md:[-webkit-overflow-scrolling:touch] md:absolute md:inset-x-0 md:top-0 md:flex md:items-center md:justify-center"
                : cn(
                    "absolute inset-x-0",
                    fixedHeaderOnMobile
                      ? "max-md:overflow-hidden max-md:flex max-md:items-center max-md:justify-center md:flex md:items-center md:justify-center"
                      : "flex items-center justify-center max-md:items-start max-md:justify-center max-md:pt-10",
                    hasContinue
                      ? "max-md:mobile-content-bottom md:bottom-[108px]"
                      : "max-md:mobile-content-bottom md:bottom-8",
                    "top-0"
                  ),
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            )}
            style={
              scrollOnMobile
                ? undefined
                : desktopScrollTop > 0
                  ? { top: desktopScrollTop }
                  : undefined
            }
          >
            <div
              className={cn(
                "mx-auto w-full max-w-2xl",
                scrollOnMobile
                  ? "max-md:py-2 max-md:pb-[calc(var(--mobile-dock-h)+1rem)] py-4 md:py-4"
                  : "py-4",
                contentClassName
              )}
            >
              {children}
            </div>
          </div>

          {scrollOnMobile && (
            <>
              <motion.div
                initial={false}
                animate={{ opacity: headerScrolled ? 1 : 0 }}
                transition={MOTION.fast}
              >
                <VanishingFade edge="top" className="max-md:block md:hidden" />
              </motion.div>
              <VanishingFade
                edge="bottom"
                className="h-24 max-md:block md:hidden"
              />
            </>
          )}
        </div>

        {hasContinue && (
          <>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[9] hidden h-48 md:h-52 md:block"
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
      className="absolute inset-0 z-20 app-viewport-h w-full"
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
