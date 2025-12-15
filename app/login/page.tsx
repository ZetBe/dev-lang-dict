"use client";

import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function LoginPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // --- Animation Logic Start ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 스프링 설정: 조금 더 쫀득한 느낌 (stiffness 증가, damping 조정)
  const springConfig = { damping: 20, stiffness: 250 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // 움직일 대상(로고)의 위치 정보를 저장할 Ref
  const logoRef = useRef<HTMLDivElement>(null);
  // 계산된 위치값 캐싱 (성능 최적화 핵심)
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    // 마우스가 영역에 들어올 때, 움직여야 할 '로고'의 현재 위치를 계산해 둡니다.
    // 이렇게 하면 mouseMove 때마다 getBoundingClientRect를 호출하지 않아도 됩니다.
    if (logoRef.current) {
      rectRef.current = logoRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // 로고 위치 정보가 없으면 실행하지 않음
    if (!rectRef.current) return;

    const rect = rectRef.current;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const dx = mouseX - centerX;
    const dy = mouseY - centerY;

    // 피타고라스 정리 (거리 계산)
    const distance = Math.sqrt(dx * dx + dy * dy);

    // 반응할 반경 (픽셀)
    const threshold = 200;

    if (distance < threshold) {
      // 거리에 따른 힘 계산 (0 ~ 1)
      const force = (threshold - distance) / threshold;
      // 최대 이동 거리 (픽셀)
      const maxDisplacement = 400;

      // 최적화된 벡터 연산 (삼각함수 제거)
      // dx / distance는 코사인, dy / distance는 사인과 같습니다.
      const moveX = -(dx / distance) * force * maxDisplacement;
      const moveY = -(dy / distance) * force * maxDisplacement;

      x.set(moveX);
      y.set(moveY);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rectRef.current = null; // 나갈 때 초기화 (선택사항)
  };
  // --- Animation Logic End ---

  const handleLogin = async (provider: "google" | "github" | "kakao") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 lg:h-screen xl:min-h-[800px]">
      {/* Left Panel (Form) */}
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">환영합니다</h1>
            <p className="text-balance text-muted-foreground">
              이메일로 로그인하거나 소셜 계정을 이용하세요
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="email">이메일</label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <label htmlFor="password">비밀번호</label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline text-muted-foreground hover:text-primary"
                >
                  비밀번호를 잊으셨나요?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="remember"
                className="text-sm text-muted-foreground"
              >
                30일간 로그인 유지
              </label>
            </div>

            <Button type="submit" className="w-full">
              로그인
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                또는 소셜 계정으로 계속
              </span>
            </div>
          </div>

          <div className="grid gap-2">
            <Button
              variant="outline"
              onClick={() => handleLogin("google")}
              className="w-full"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google로 계속하기
            </Button>
            <Button
              variant="outline"
              onClick={() => handleLogin("github")}
              className="w-full"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub로 계속하기
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            계정이 없으신가요?{" "}
            <Link href="#" className="underline hover:text-primary">
              회원가입
            </Link>
          </div>
        </div>
      </div>

      {/* Right Panel (Animation Area) */}
      <div
        className="hidden lg:flex items-center justify-center relative overflow-hidden bg-muted"
        onMouseEnter={handleMouseEnter} // 진입 시 로고 위치 계산
        onMouseMove={handleMouseMove} // 이동 시 애니메이션 적용
        onMouseLeave={handleMouseLeave} // 이탈 시 초기화
      >
        {/* Decorative blur blob */}
        <div className="absolute w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-8 p-12 text-center">
          <motion.div
            ref={logoRef} // 여기에 ref를 연결해야 정확한 위치를 파악합니다.
            style={{ x: springX, y: springY }}
            className="relative w-40 h-40 group cursor-default" // cursor-default 추가 (선택사항)
          >
            <div className="absolute inset-0 bg-gradient-to-tr rounded-[32px] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-80 blur-xl"></div>
            <div className="relative w-full h-full bg-black/50 backdrop-blur-xl rounded-[32px] flex items-center justify-center border border-white/10 shadow-2xl">
              <Image
                src="/web-app-manifest-512x512.png"
                alt="Logo"
                width={80}
                height={80}
                className="w-20 h-20 drop-shadow-lg"
              />
            </div>
          </motion.div>

          <div className="max-w-md space-y-2 pointer-events-none">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              개발어사전
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
