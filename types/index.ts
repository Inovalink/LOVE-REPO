export type AppPhase = "loading" | "code" | "unlock" | "main";

export interface TimelineEvent {
  id: string;
  date: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  accent?: string;
  heroPosition?: string;
}

export interface PolaroidImage {
  id: string;
  src: string;
  caption: string;
  rotation: number;
}

export interface Sparkle {
  id: number;
  x: number;
  y: number;
}
