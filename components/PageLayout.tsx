import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: ReactNode;
  badge?: string;
  badgeIcon?: LucideIcon;
  className?: string; // For the outer container
  maxWidth?: "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
  align?: "center" | "left";
}

export default function PageLayout({
  children,
  title,
  description,
  badge,
  badgeIcon: BadgeIcon,
  className,
  maxWidth = "6xl",
  align = "center",
}: PageLayoutProps) {
  const alignClass =
    align === "center" ? "items-center text-center" : "items-start text-left";

  const maxWidthClass = {
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  }[maxWidth];

  return (
    <div
      className={cn(
        "min-h-screen p-8 md:p-12 mx-auto space-y-12",
        maxWidthClass,
        className
      )}
    >
      {(title || description || badge) && (
        <div className={cn("flex flex-col space-y-4", alignClass)}>
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-500">
              {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
              <span>{badge}</span>
            </div>
          )}
          {title && (
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground font-mono animate-in fade-in slide-in-from-bottom-4 duration-700">
              {title}
            </h1>
          )}
          {description && (
            <div className="text-muted-foreground text-lg max-w-2xl animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-100">
              {description}
            </div>
          )}
        </div>
      )}

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
        {children}
      </div>
    </div>
  );
}
