"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

export interface SectionProgressState {
  current: number;
  total: number;
}

interface MobileNavContextValue {
  musicSlot: HTMLDivElement | null;
  setMusicSlot: Dispatch<SetStateAction<HTMLDivElement | null>>;
  subNavSlot: HTMLDivElement | null;
  setSubNavSlot: Dispatch<SetStateAction<HTMLDivElement | null>>;
  sectionProgress: SectionProgressState | null;
  setSectionProgress: Dispatch<SetStateAction<SectionProgressState | null>>;
}

export const MobileNavContext = createContext<MobileNavContextValue | null>(
  null
);

export function MobileNavProvider({ children }: { children: ReactNode }) {
  const [musicSlot, setMusicSlot] = useState<HTMLDivElement | null>(null);
  const [subNavSlot, setSubNavSlot] = useState<HTMLDivElement | null>(null);
  const [sectionProgress, setSectionProgress] = useState<SectionProgressState | null>(
    null
  );

  return (
    <MobileNavContext.Provider
      value={{
        musicSlot,
        setMusicSlot,
        subNavSlot,
        setSubNavSlot,
        sectionProgress,
        setSectionProgress,
      }}
    >
      {children}
    </MobileNavContext.Provider>
  );
}

export function useMobileNav() {
  return useContext(MobileNavContext);
}
