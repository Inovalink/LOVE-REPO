"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { subtitle, title } from "@/lib/styles";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
}

export function SectionHeader({
  eyebrow,
  title: heading,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <motion.header
      className={cn(
        "mb-6 md:mb-8",
        align === "center" && "text-center",
        className
      )}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && (
        <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.22em] text-rose-400/80">
          {eyebrow}
        </p>
      )}
      <h2 className={title}>{heading}</h2>
      {description && (
        <p className={cn(subtitle, "mt-3", align === "left" && "mx-0")}>
          {description}
        </p>
      )}
    </motion.header>
  );
}
