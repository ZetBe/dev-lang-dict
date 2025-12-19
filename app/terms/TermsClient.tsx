"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Term } from "@/utils/types";
import TermCard from "@/components/TermCard";
import { cn } from "@/lib/utils";
import { Book, X } from "lucide-react";
import PageLayout from "@/components/PageLayout";

interface TermsClientProps {
  initialTerms: Term[];
}

export default function TermsClient({ initialTerms }: TermsClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const selectedTag = searchParams.get("tag");

  // Get all unique tags for filter UI (optional, or remove if moving to SearchModal completely)
  // For now keeping a simple tag list if desired, or just removing it to match "Clean" requirement.
  // The user asked to "migrate related functions to header".
  // So I will remove the tag list here and assume SearchModal handles discovery.
  // But wait, the user might still want to see tags to click on?
  // "header의 검색 영역을 클릭하면... 태그를 보여줘" -> Tags in Header Modal.
  // So I can remove the tag list from here to clean up.

  // Filter terms
  const filteredTerms = useMemo(() => {
    return initialTerms.filter((term) => {
      const matchesSearch =
        !searchQuery ||
        term.term.toLowerCase().includes(searchQuery) ||
        term.definition.toLowerCase().includes(searchQuery) ||
        (term.tags &&
          term.tags.some((tag) => tag.toLowerCase().includes(searchQuery)));

      const matchesTag =
        !selectedTag || (term.tags && term.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [initialTerms, searchQuery, selectedTag]);

  const clearFilters = () => {
    router.push("/terms");
  };

  return (
    <PageLayout
      title="DICTIONARY"
      badge="Knowledge Base"
      badgeIcon={Book}
      description="개발자에게 필요한 모든 용어를 담았습니다."
    >
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-muted-foreground justify-center">
          <span>총 {filteredTerms.length}개의 용어가 있습니다.</span>
          {(searchQuery || selectedTag) && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors ml-4"
            >
              <X className="h-3 w-3" />
              필터 초기화
            </button>
          )}
        </div>
      </div>

      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTerms.map((term) => (
            <TermCard key={term.id} term={term} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-border rounded-2xl bg-muted/50">
          <p className="text-xl text-muted-foreground mb-2">
            검색 결과가 없습니다
          </p>
          <p className="text-muted-foreground mb-6">
            "{searchQuery || selectedTag}"에 해당하는 용어를 찾을 수 없습니다.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors"
          >
            전체 목록 보기
          </button>
        </div>
      )}
    </PageLayout>
  );
}
