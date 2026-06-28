"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="border-t border-rose-100/80 px-6 py-8 text-center">
      <motion.p
        className="font-sans text-sm text-rose-500/70"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Made with love, just for you
      </motion.p>
    </footer>
  );
}
