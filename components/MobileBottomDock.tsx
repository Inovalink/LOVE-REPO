"use client";

import { ContinueButton } from "@/components/ContinueButton";
import { PreviousButton } from "@/components/PreviousButton";
import { SectionProgress } from "@/components/SectionProgress";
import { useMobileNav } from "@/components/MobileNavContext";

interface MobileBottomDockProps {
  showPrev: boolean;
  onPrev?: () => void;
  showContinue: boolean;
  onNext?: () => void;
  nextLabel?: string;
}

export function MobileBottomDock({
  showPrev,
  onPrev,
  showContinue,
  onNext,
  nextLabel,
}: MobileBottomDockProps) {
  const mobileNav = useMobileNav();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex flex-col md:hidden"
      style={{ paddingBottom: "var(--mobile-dock-pad)" }}
    >
      <div className="grid h-10 grid-cols-[2.5rem_1fr_2.5rem] items-center gap-2 px-4">
        <div className="flex items-center justify-center">
          {showPrev && onPrev && <PreviousButton onClick={onPrev} iconOnly />}
        </div>
        <div className="flex h-10 min-w-0 items-center justify-center">
          {showContinue && onNext && (
            <ContinueButton
              onClick={onNext}
              label={nextLabel}
              className="pt-0 pb-0 [&_button]:h-10 [&_button]:max-w-[min(100%,13rem)] [&_button]:truncate [&_button]:px-3.5 [&_button]:py-0 [&_button]:text-[12px]"
            />
          )}
        </div>
        <div
          ref={mobileNav?.setMusicSlot}
          className="flex h-10 w-10 items-center justify-center justify-self-end"
        />
      </div>

      {mobileNav?.sectionProgress && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <div
            ref={mobileNav?.setSubNavSlot}
            className="flex items-center justify-center empty:hidden"
          />
          <SectionProgress
            embedded
            current={mobileNav.sectionProgress.current}
            total={mobileNav.sectionProgress.total}
          />
        </div>
      )}
    </div>
  );
}
