"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

interface MobileNavContextValue {
  musicSlot: HTMLDivElement | null;
  setMusicSlot: Dispatch<SetStateAction<HTMLDivElement | null>>;
}

export const MobileNavContext = createContext<MobileNavContextValue | null>(
  null
);

export function MobileNavProvider({ children }: { children: ReactNode }) {
  const [musicSlot, setMusicSlot] = useState<HTMLDivElement | null>(null);

  return (
    <MobileNavContext.Provider value={{ musicSlot, setMusicSlot }}>
      {children}
    </MobileNavContext.Provider>
  );
}

export function useMobileNav() {
  return useContext(MobileNavContext);
}
