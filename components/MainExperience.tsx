"use client";

import dynamic from "next/dynamic";
import { useCallback, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Hero } from "@/components/Hero";
import { HeartAnimation } from "@/components/HeartAnimation";
import { SurpriseButton } from "@/components/SurpriseButton";
import { CustomCursor } from "@/components/CustomCursor";
import { EasterEggMessage } from "@/components/EasterEggMessage";
import { SectionSlide, SlideWrapper } from "@/components/SectionSlide";
import { SectionProgress } from "@/components/SectionProgress";
import { useEasterEgg } from "@/hooks/useEasterEgg";
import { useDoubleTap } from "@/hooks/useDoubleTap";

const Envelope = dynamic(() =>
  import("@/components/Envelope").then((m) => ({ default: m.Envelope }))
);
const ReasonsSection = dynamic(() =>
  import("@/components/ReasonsSection").then((m) => ({
    default: m.ReasonsSection,
  }))
);
const Timeline = dynamic(() =>
  import("@/components/Timeline").then((m) => ({ default: m.Timeline }))
);
const LoveCounter = dynamic(() =>
  import("@/components/LoveCounter").then((m) => ({ default: m.LoveCounter }))
);
const AmazingCards = dynamic(() =>
  import("@/components/AmazingCards").then((m) => ({ default: m.AmazingCards }))
);

const SECTION_LABELS = [
  "Begin",
  "Letter",
  "Reasons",
  "Memories",
  "Counter",
  "Amazing",
] as const;

const NEXT_LABELS = [
  "Read my letter",
  "The little things",
  "Our memories",
  "It's been months already",
  "The Amazing things",
] as const;

interface MainExperienceProps {
  onRestart: () => void;
}

export function MainExperience({ onRestart }: MainExperienceProps) {
  const [step, setStep] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const totalSteps = SECTION_LABELS.length;
  const isLastStep = step === totalSteps - 1;

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const revealEasterEgg = useCallback(() => setShowEasterEgg(true), []);
  useEasterEgg(revealEasterEgg);

  const handleDoubleTap = useCallback(() => {
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 1500);
  }, []);
  const onTouchEnd = useDoubleTap(handleDoubleTap);

  const goNext = useCallback(() => {
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }, [totalSteps]);

  const goBack = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const slideProps = (index: number) => ({
    onNext: goNext,
    onPrev: goBack,
    showPrev: index > 0,
    nextLabel: NEXT_LABELS[index],
  });

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <SectionSlide {...slideProps(0)}>
            <Hero />
          </SectionSlide>
        );
      case 1:
        return (
          <SectionSlide {...slideProps(1)} contentClassName="md:max-w-4xl" scrollOnMobile>
            <Envelope />
          </SectionSlide>
        );
      case 2:
        return (
          <SectionSlide {...slideProps(2)} scrollOnMobile>
            <ReasonsSection />
          </SectionSlide>
        );
      case 3:
        return (
          <SectionSlide {...slideProps(3)}>
            <Timeline />
          </SectionSlide>
        );
      case 4:
        return (
          <SectionSlide {...slideProps(4)}>
            <LoveCounter />
          </SectionSlide>
        );
      case 5:
        return (
          <SectionSlide showNext={false} onPrev={goBack} showPrev>
            <AmazingCards />
          </SectionSlide>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-10 h-dvh overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      onTouchEnd={onTouchEnd}
    >
      <BackgroundEffects />
      <CustomCursor />
      <MusicPlayer />
      <SurpriseButton />

      <main className="relative h-dvh w-full">
        <AnimatePresence mode="wait">
          <SlideWrapper key={step}>{renderStep()}</SlideWrapper>
        </AnimatePresence>
      </main>

      {!isLastStep && <SectionProgress current={step} total={totalSteps} />}

      <EasterEggMessage
        show={showEasterEgg}
        onClose={() => setShowEasterEgg(false)}
      />

      <AnimatePresence>
        {showHeartBurst && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <HeartAnimation />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
