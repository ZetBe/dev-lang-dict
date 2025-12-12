"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Term } from "@/utils/types";
import TermCard from "@/components/TermCard";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";

interface TermsClientProps {
  initialTerms: Term[];
}

export default function TermsClient({ initialTerms }: TermsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL state
  const selectedTag = searchParams.get("tag");
  const searchQuery = searchParams.get("q") || "";

  // Local state for modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync local search with URL when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      setLocalSearch(searchQuery);
      // Small timeout to ensure modal is mounted before focus
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen, searchQuery]);

  // Update URL helper
  const updateFilters = (tag: string | null, query: string) => {
    const params = new URLSearchParams();
    if (tag) params.set("tag", tag);
    if (query) params.set("q", query);
    router.push(`/terms?${params.toString()}`);
    setIsSearchOpen(false); // Close modal on update
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(selectedTag, localSearch);
  };

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialTerms.forEach((term) => {
      term.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [initialTerms]);

  // Filter terms based on selection and search
  const filteredTerms = useMemo(() => {
    return initialTerms.filter((term) => {
      const matchTag = selectedTag ? term.tags?.includes(selectedTag) : true;
      const matchQuery = searchQuery
        ? term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchTag && matchQuery;
    });
  }, [initialTerms, selectedTag, searchQuery]);

  return (
    <div className="container mx-auto p-8 py-12 relative">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-8">
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-white pb-1">
            전체 보기
          </h1>
          <p className="text-zinc-400">한번에 보고 싶은 사람들을 위해</p>
          <p className="text-zinc-400">
            모으고 모아 {initialTerms.length}개의 용어들을 모았습니다.
          </p>

          <div className="relative mt-4 max-w-md">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-md bg-black/50 border border-zinc-800 text-zinc-400 hover:text-zinc-300 hover:border-zinc-700 transition-colors text-sm"
            >
              <SearchIcon className="h-4 w-4" />
              <span>
                {searchQuery || selectedTag ? (
                  <span className="text-white">
                    {searchQuery && `"${searchQuery}"`}
                    {searchQuery && selectedTag && " + "}
                    {selectedTag && `#${selectedTag}`}
                  </span>
                ) : (
                  "검색하거나 태그를 선택하세요..."
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Search Modal */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsSearchOpen(false)}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <form
                onSubmit={handleSearchSubmit}
                className="relative border-b border-zinc-800"
              >
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  ref={inputRef}
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="검색어 입력 후 Enter..."
                  className="w-full pl-10 py-6 bg-transparent border-none text-lg focus-visible:ring-0 rounded-none"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-zinc-400" />
                </button>
              </form>

              <div className="p-4 bg-zinc-950/50">
                <div className="text-xs font-medium text-zinc-500 mb-3 px-1">
                  태그로 필터링
                </div>
                <div className="flex flex-wrap gap-2 max-h-[40vh] overflow-y-auto custom-scrollbar">
                  <button
                    onClick={() => updateFilters(null, localSearch)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm transition-all border border-transparent",
                      selectedTag === null
                        ? "bg-white text-black font-medium"
                        : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
                    )}
                  >
                    전체
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => updateFilters(tag, localSearch)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm transition-all border border-transparent",
                        selectedTag === tag
                          ? "bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/20"
                          : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-blue-500/50 hover:text-blue-400"
                      )}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTerms.map((term) => (
            <TermCard key={term.id} term={term} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-zinc-500 glass-panel rounded-2xl">
          <p className="text-xl">
            No terms found
            {selectedTag && ` with tag #${selectedTag}`}
            {searchQuery && ` matching "${searchQuery}"`}.
          </p>
          <button
            onClick={() => updateFilters(null, "")}
            className="mt-4 text-blue-400 hover:text-blue-300 underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
