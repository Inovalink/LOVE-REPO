"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MUSIC_ARTIST, MUSIC_TITLE, MUSIC_VOLUME } from "@/lib/constants";
import { getMusicAudio, startMusic } from "@/lib/music";
import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  autostart?: boolean;
}

export function MusicPlayer({ autostart = false }: MusicPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const autostarted = useRef(false);

  useEffect(() => {
    const audio = getMusicAudio();
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => {
      setLoadError(true);
      setPlaying(false);
    };
    const onCanPlay = () => setLoadError(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    audio.addEventListener("canplay", onCanPlay);
    setPlaying(!audio.paused);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  useEffect(() => {
    if (!autostart || autostarted.current) return;
    autostarted.current = true;
    startMusic();
  }, [autostart]);

  const toggleMusic = async () => {
    const audio = getMusicAudio();
    if (!audio || loadError) return;

    if (playing) {
      audio.pause();
      return;
    }

    audio.volume = MUSIC_VOLUME;
    if (audio.error) {
      audio.load();
    }
    try {
      await audio.play();
      setLoadError(false);
    } catch {
      // Browser blocked playback until user interacts again
    }
  };

  return (
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
        "fixed right-4 top-5 z-50 flex h-10 max-w-[min(16rem,calc(100vw-2.5rem))] items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-3.5 backdrop-blur-sm md:right-6 md:top-6",
        "font-sans text-[13px] text-rose-700/80 transition-colors hover:bg-white"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.85, duration: 0.55 }}
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
          {loadError ? "Add song file" : MUSIC_TITLE}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
