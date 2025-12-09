import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            DevSay
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/terms"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            All Terms
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            GitHub
          </Link>
          <Button
            variant="outline"
            className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800"
          >
            Submit Term
          </Button>
        </nav>
      </div>
    </header>
  );
}
