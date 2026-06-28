"use client";

import { ReactNode, useContext, useEffect } from "react";
import { FixedHeaderContext } from "@/components/SectionSlide";

export function useFixedSectionHeader(header: ReactNode, deps: unknown[] = []) {
  const setFixedHeader = useContext(FixedHeaderContext);

  useEffect(() => {
    if (!setFixedHeader) return;
    setFixedHeader(header);
    return () => setFixedHeader(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFixedHeader, ...deps]);
}
