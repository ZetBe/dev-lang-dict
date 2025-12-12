import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-black py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} 개발어사전. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link
            href="https://github.com/ZetBe/dev-lang-dict"
            target="_blank"
            className="text-sm text-zinc-500 hover:text-white transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="/terms"
            className="text-sm text-zinc-500 hover:text-white transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
