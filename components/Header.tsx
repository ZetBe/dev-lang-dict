"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeButton } from "./ThemeButton";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SearchIcon,
  BookOpen,
  Users,
  Flag,
  LogIn,
  LogOut,
  MessageSquare,
  Moon,
  Sun,
} from "lucide-react";
import SearchModal from "@/components/SearchModal";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createBrowserClient } from "@supabase/ssr";

export default function Header() {
  const [showToast, setShowToast] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };
    checkUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.refresh();
  };

  const handleCommunityClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const navItems = [
    { href: "/terms", label: "전체보기", icon: BookOpen },
    {
      href: "#community",
      label: "커뮤니티",
      icon: MessageSquare,
      onClick: handleCommunityClick,
    },
    { href: "/contributors", label: "기여자", icon: Users },
    {
      href: "https://github.com/ZetBe/dev-lang-dict/issues",
      label: "제보하기",
      icon: Flag,
      external: true,
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur ">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
          {/* Logo & Search Area */}
          <div className="flex items-center gap-6 flex-1 max-w-2xl">
            <Link href="/" className="shrink-0 flex items-center gap-2 mr-2">
              <Image
                src="/favicon.ico"
                alt="Logo"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-lg font-bold text-foreground hidden sm:block">
                개발어사전
              </span>
            </Link>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex flex-1 items-center gap-3 px-4 py-2.5 rounded hover:bg-zinc-800 hover:text-zinc-200 transition-all border border-zinc-700 hover:border-zinc-700 group w-full max-w-md"
            >
              <SearchIcon className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
              <span className="text-sm">검색...</span>
              <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-700 px-1.5 font-mono text-[10px] font-medium ml-auto opacity-50">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1 sm:gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 text-zinc-400 "
            >
              <SearchIcon className="h-6 w-6" />
            </button>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              if (item.onClick) {
                return (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className="flex flex-col items-center gap-1 px-2 group"
                  >
                    <Icon className="h-6 w-6 text-zinc-400  transition-colors" />
                    <span className="text-[10px] text-zinc-400 transition-colors hidden sm:block">
                      {item.label}
                    </span>
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-1 px-2 group relative",
                    isActive
                      ? "text-black dark:text-white"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-6 w-6 transition-colors",
                      isActive
                        ? "text-black dark:text-white"
                        : "text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[10px] transition-colors hidden sm:block",
                      isActive
                        ? "text-black dark:text-white"
                        : "text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                    )}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-[19px] left-0 right-0 h-0.5 bg-black dark:bg-white" />
                  )}
                </Link>
              );
            })}
            <ThemeButton />

            <div className="w-px h-8 bg-zinc-800 mx-2 hidden sm:block" />

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex flex-col items-center gap-1 px-2 group"
              >
                <LogOut className="h-6 w-6 text-zinc-400 group-hover:text-red-400 transition-colors" />
                <span className="text-[10px] text-zinc-400 group-hover:text-red-400 transition-colors hidden sm:block">
                  로그아웃
                </span>
              </button>
            ) : (
              <Link
                href="/login"
                className="flex flex-col items-center gap-1 px-2 group"
              >
                <LogIn className="h-6 w-6 text-zinc-400 group-hover:text-blue-400 transition-colors" />
                <span className="text-[10px] text-zinc-400 group-hover:text-blue-400 transition-colors hidden sm:block">
                  로그인
                </span>
              </Link>
            )}
          </nav>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 rounded-lg border border-zinc-800 bg-zinc-950 px-6 py-3 text-sm text-white shadow-2xl flex items-center gap-3"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            🚧 커뮤니티 기능은 준비 중입니다
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
