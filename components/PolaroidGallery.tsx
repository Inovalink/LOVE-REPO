"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { POLAROID_IMAGES } from "@/lib/data/gallery";
import { SectionHeader } from "@/components/SectionHeader";
import { card, section } from "@/lib/styles";

export function PolaroidGallery() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className={section}>
      <SectionHeader
        eyebrow="Captured moments"
        title="Our Memories"
      />

      <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-5">
        {POLAROID_IMAGES.map((photo, i) => (
          <motion.button
            key={photo.id}
            onClick={() => setSelected(photo.id)}
            className={`${card} relative cursor-pointer overflow-hidden p-2 pb-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200`}
            style={{ rotate: `${photo.rotation * 0.6}deg` }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            aria-label={`View: ${photo.caption}`}
          >
            <div className="relative h-40 w-40 overflow-hidden rounded-lg bg-rose-50 md:h-44 md:w-44">
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover"
                sizes="176px"
              />
            </div>
            <p className="absolute bottom-2.5 left-0 right-0 text-center font-sans text-xs text-rose-400">
              {photo.caption}
            </p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-rose-950/40 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className={`${card} relative max-w-xs w-full p-3`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-rose-400 text-white"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-rose-50">
                <Image
                  src={POLAROID_IMAGES.find((p) => p.id === selected)?.src ?? ""}
                  alt="Photo"
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
              <p className="mt-3 text-center font-sans text-sm text-rose-500">
                {POLAROID_IMAGES.find((p) => p.id === selected)?.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
