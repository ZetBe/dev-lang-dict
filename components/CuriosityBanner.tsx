"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

export default function CuriosityBanner() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(
      crypto.getRandomValues(new Uint32Array(1))[0] % t.curiosity_phrases.length
    );
  }, [t.curiosity_phrases.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % t.curiosity_phrases.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [t.curiosity_phrases.length]);

  return (
    <div className="h-8 flex items-center justify-center overflow-hidden w-full mb-8">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm md:text-base text-zinc-500 font-medium"
        >
          🤔 {t.curiosity_phrases[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
