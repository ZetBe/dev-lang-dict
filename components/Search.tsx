"use client";

import { useState, useEffect, useRef } from "react";
import { searchTerms } from "@/utils/api";
import { Term } from "@/utils/types";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Term[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounce logic inline for simplicity since we don't have a hooks file yet
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 0) {
        setIsLoading(true);
        try {
          const data = await searchTerms(query);
          setResults(data);
          setShowResults(true);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div className="w-full max-w-md mt-6 relative group" ref={searchRef}>
      <div className="absolute -inset-1 bg-gradient-to-r from-zinc-500 to-zinc-300 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

      <div className="relative shadow-xl">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setShowResults(true);
          }}
          placeholder="검색할 용어를 입력하세요..."
          className="w-full bg-zinc-950/80 backdrop-blur-sm border-zinc-700 text-white placeholder:text-zinc-500 text-lg h-14 rounded-lg focus-visible:ring-zinc-400 focus-visible:border-zinc-500 transition-all font-medium"
        />
      </div>

      {/* Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-zinc-950/95 backdrop-blur-xl border border-zinc-700 rounded-xl overflow-hidden shadow-2xl z-50">
          {isLoading ? (
            <div className="p-4 text-center text-zinc-500">검색 중...</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((term) => (
                <li
                  key={term.id}
                  className="border-b border-zinc-800/50 last:border-none"
                >
                  <Link
                    href={`/terms/${term.slug}`}
                    className="block p-4 hover:bg-white/5 transition flex justify-between items-center group"
                    onClick={() => setShowResults(false)}
                  >
                    <div>
                      <span className="font-bold text-white group-hover:text-blue-400 transition">
                        {term.term}
                      </span>
                      <span className="text-zinc-500 text-sm ml-2 truncate max-w-[200px] inline-block align-bottom">
                        {term.definition}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-zinc-500">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
