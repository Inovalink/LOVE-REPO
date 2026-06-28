"use client";

import { useEffect, useState } from "react";
import { LOVE_START_DATE } from "@/lib/constants";

interface LoveTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateLoveTime(): LoveTime {
  const now = new Date();
  const diff = now.getTime() - LOVE_START_DATE.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export function useLoveCounter() {
  const [time, setTime] = useState<LoveTime>(calculateLoveTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateLoveTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}
