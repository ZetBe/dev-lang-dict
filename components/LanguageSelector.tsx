"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="flex flex-col gap-1 bg-card border border-border rounded-xl p-2 shadow-xl mb-2 min-w-[120px]"
          >
            <button
              onClick={() => {
                setLanguage("ko");
                setIsOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                language === "ko"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              }`}
            >
              🇰🇷 한국어
            </button>
            <button
              onClick={() => {
                setLanguage("en");
                setIsOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                language === "en"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              }`}
            >
              en English
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleOpen}
        className="w-12 h-12 bg-background border border-border rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-muted transition-colors"
        aria-label="Select Language"
      >
        🌐
      </button>
    </div>
  );
}
