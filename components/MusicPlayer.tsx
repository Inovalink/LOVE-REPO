"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MUSIC_ARTIST, MUSIC_SRC, MUSIC_TITLE, MUSIC_VOLUME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => setLoadError(true);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio || loadError) return;

    if (playing) {
      audio.pause();
      return;
    }

    audio.volume = MUSIC_VOLUME;
    try {
      await audio.play();
    } catch {
      // Browser blocked playback until user interacts again
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto" src={MUSIC_SRC} />

      <motion.button
        onClick={toggleMusic}
        disabled={loadError}
        title={
          loadError
            ? "Music file could not be loaded"
            : `${MUSIC_TITLE} — ${MUSIC_ARTIST}`
        }
        aria-label={
          playing
            ? `Pause ${MUSIC_TITLE} by ${MUSIC_ARTIST}`
            : `Play ${MUSIC_TITLE} by ${MUSIC_ARTIST}`
        }
        className={cn(
          "fixed top-5 right-5 z-50 flex h-10 max-w-[min(16rem,calc(100vw-2.5rem))] items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-3.5 backdrop-blur-sm",
          "font-sans text-[13px] text-rose-700/80 transition-colors hover:bg-white"
        )}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        whileTap={{ scale: 0.97 }}
      >
        <span
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full text-white",
            playing ? "bg-rose-400" : "bg-rose-300"
          )}
        >
          {playing ? (
            <Pause className="h-3 w-3" fill="currentColor" />
          ) : (
            <Music className="h-3 w-3" />
          )}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={playing ? "on" : "off"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hidden truncate sm:inline"
          >
            {loadError
              ? "Music unavailable"
              : playing
                ? MUSIC_TITLE
                : "Play music"}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}
