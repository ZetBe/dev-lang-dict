"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CURIOUS_PHRASES = [
  "SQL... 스퀄일까요 시퀄일까요?",
  "Comfortable... 컴포터블? 컴포타블?",
  "Width... 위드스? 윗뜨?",
  "Tuple... 튜플? 터플?",
  "Linux... 리눅스? 라이너스?",
  "Char... 차? 캐릭터? 케어?",
  "GUI... 지유아이? 구이?",
  "Kubernetes... 쿠버네티스? 큐브?",
];

export default function CuriosityBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % CURIOUS_PHRASES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

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
          🤔 {CURIOUS_PHRASES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
