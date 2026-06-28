"use client";

import { useCallback, useRef } from "react";

export function useDoubleTap(onDoubleTap: () => void) {
  const lastTap = useRef(0);

  const handleTouchEnd = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      onDoubleTap();
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  }, [onDoubleTap]);

  return handleTouchEnd;
}
