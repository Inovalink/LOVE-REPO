"use client";

import { ReactNode, useContext, useLayoutEffect } from "react";
import { FixedHeaderContext } from "@/components/SectionSlide";

export function useFixedSectionHeader(header: ReactNode, deps: unknown[] = []) {
  const setFixedHeader = useContext(FixedHeaderContext);

  useLayoutEffect(() => {
    if (!setFixedHeader) return;
    setFixedHeader(header);
    return () => setFixedHeader(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFixedHeader, ...deps]);
}
