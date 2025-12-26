"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function CountdownTimer() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(now);

      // Set target to 6:00:00 AM
      target.setHours(6, 0, 0, 0);

      // If it's already past 6 AM today, target tomorrow 6 AM
      if (now.getTime() > target.getTime()) {
        target.setDate(target.getDate() + 1);
      }

      const diff = target.getTime() - now.getTime();

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    // Initial set
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Avoid hydration mismatch by rendering nothing initially or a static placeholder
  // But since we want to show it immediately if possible, we settle for simple client-side rendering
  if (!timeLeft) {
    return (
      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {t.timer_reset_daily}
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1.5 text-sm font-medium text-primary animate-in fade-in duration-300">
      <Clock className="w-3.5 h-3.5" />
      <span>
        {t.timer_next_update} {timeLeft}
      </span>
    </span>
  );
}
