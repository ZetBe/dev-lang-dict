"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [showToast, setShowToast] = useState(false);

  const handleCommunityClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              개발어사전
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              전체보기
            </Link>
            <button
              onClick={handleCommunityClick}
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white cursor-pointer"
            >
              커뮤니티
            </button>
            <Link
              href="/contributors"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              기여자
            </Link>
            <Link
              href="https://github.com/ZetBe/dev-lang-dict/issues/new"
              target="_blank"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              제보하기
            </Link>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "150%" }}
            animate={{ opacity: 1, y: 0, x: "150%" }}
            exit={{ opacity: 0, y: -20, x: "150%" }}
            className="fixed top-20 left-1/2 z-50 rounded-full border border-zinc-800 bg-zinc-950/90 px-6 py-2 text-sm text-white backdrop-blur shadow-2xl"
          >
            🚧 커뮤니티 기능은 준비 중입니다
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
