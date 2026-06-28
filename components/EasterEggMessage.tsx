"use client";

import { motion, AnimatePresence } from "framer-motion";

interface EasterEggMessageProps {
  show: boolean;
  onClose: () => void;
}

export function EasterEggMessage({ show, onClose }: EasterEggMessageProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-rose-950/30 px-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="max-w-sm rounded-2xl border border-rose-100 bg-white/95 p-8 text-center shadow-lg"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-sans text-xs uppercase tracking-wider text-rose-400">
              Secret note
            </p>
            <p className="mt-4 font-sans text-[15px] leading-relaxed text-rose-700/80">
              You found my hidden message. Every second with you is a gift, and I
              fall in love with you more each day. You are my forever.
            </p>
            <button
              onClick={onClose}
              className="mt-6 font-sans text-xs text-rose-400 transition-colors hover:text-rose-600"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
