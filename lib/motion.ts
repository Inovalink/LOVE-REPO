export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN = [0.4, 0, 0.6, 1] as const;

export const MOTION = {
  fast: { duration: 0.38, ease: EASE_OUT },
  medium: { duration: 0.52, ease: EASE_OUT },
  enter: { duration: 0.48, ease: EASE_OUT, delay: 0.06 },
  exit: { duration: 0.28, ease: EASE_IN },
  stagger: { duration: 0.48, ease: EASE_OUT },
} as const;

export const slideVariants = {
  initial: {
    opacity: 0,
    scale: 0.985,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: MOTION.enter,
  },
  exit: {
    opacity: 0,
    scale: 1.008,
    filter: "blur(3px)",
    transition: { ...MOTION.exit, delay: 0.04 },
  },
};
