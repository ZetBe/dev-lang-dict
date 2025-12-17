"use client";

import { useState, useEffect, useRef } from "react";
import { SearchIcon, X, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchTerms, searchTags } from "@/utils/api";
import { Term } from "@/utils/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [termResults, setTermResults] = useState<Term[]>([]);
  const [tagResults, setTagResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setTermResults([]);
        setTagResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const [terms, tags] = await Promise.all([
          searchTerms(query),
          searchTags(query),
        ]);
        setTermResults(terms);
        setTagResults(tags);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
    if (e.key === "Enter" && query) {
      router.push(`/terms?search=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  const hasResults = termResults.length > 0 || tagResults.length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background/80 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl mx-auto flex flex-col gap-4">
        {/* Search Bar */}
        <div className="relative w-full">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="검색어를 입력하세요 (예: React, API...)"
            className="w-full h-14 pl-12 pr-12 rounded-xl bg-muted/50 border border-border text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-xl"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted/50 rounded-full text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Results */}
        {(query || hasResults) && (
          <div className="w-full bg-popover border border-border rounded-xl overflow-hidden shadow-2xl animate-in slide-in-from-top-2 duration-200 flex flex-col max-h-[70vh]">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                검색 중...
              </div>
            ) : hasResults ? (
              <div className="overflow-y-auto">
                {/* Terms Section */}
                {termResults.length > 0 && (
                  <ul className="divide-y divide-border">
                    <li className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/30">
                      용어
                    </li>
                    {termResults.map((term) => (
                      <li key={term.id}>
                        <Link
                          href={`/terms/${term.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {term.term}
                              </span>
                              {term.tags && term.tags.length > 0 && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-muted text-muted-foreground">
                                  {term.tags[0]}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {term.definition}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tags Section */}
                {tagResults.length > 0 && (
                  <div className="border-t border-border">
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/30 flex items-center gap-2">
                      <Hash className="w-3 h-3" />
                      태그
                    </div>
                    <ul className="divide-y divide-border">
                      {tagResults.map((tag) => (
                        <li key={tag}>
                          <Link
                            href={`/terms?tag=${tag}`}
                            onClick={onClose}
                            className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                              <Hash className="w-4 h-4" />
                            </div>
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {tag}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : query ? (
              <div className="p-8 text-center">
                <p className="text-muted-foreground mb-2">
                  검색 결과가 없습니다
                </p>
                <div className="flex justify-center gap-2">
                  <span className="px-2 py-1 rounded bg-muted text-xs text-muted-foreground">
                    철자를 확인해보세요
                  </span>
                  <span className="px-2 py-1 rounded bg-muted text-xs text-muted-foreground">
                    영어로 입력해보세요
                  </span>
                  <span className="px-2 py-1 rounded bg-muted text-xs">
                    <Link
                      href="https://github.com/ZetBe/dev-lang-dict/issues"
                      target="_blank"
                    >
                      제안하러 가기
                    </Link>
                  </span>
                </div>
              </div>
            ) : null}

            {/* Quick Actions / Tips */}
            {!query && (
              <div className="p-4 bg-muted/50">
                <p className="text-xs font-semibold text-muted-foreground mb-2">
                  추천 검색어
                </p>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "API", "Hydration"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-sm text-muted-foreground transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
