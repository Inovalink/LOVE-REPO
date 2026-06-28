import { MUSIC_SRC, MUSIC_VOLUME } from "@/lib/constants";

let sharedAudio: HTMLAudioElement | null = null;

export function getMusicAudio() {
  if (typeof window === "undefined") return null;
  if (!sharedAudio) {
    sharedAudio = new Audio(MUSIC_SRC);
    sharedAudio.loop = true;
    sharedAudio.preload = "auto";
  }
  return sharedAudio;
}

/** Call during the secret-code interaction so autoplay is allowed. */
export function startMusic() {
  const audio = getMusicAudio();
  if (!audio) return;
  audio.volume = MUSIC_VOLUME;
  void audio.play().catch(() => {});
}
