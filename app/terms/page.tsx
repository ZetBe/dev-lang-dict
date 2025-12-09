import { getAllTerms } from "@/utils/api";
import TermCard from "@/components/TermCard";

export const revalidate = 0;

export default async function TermsPage() {
  const terms = await getAllTerms();

  return (
    <div className="container mx-auto p-8 py-12">
      <div className="flex flex-col gap-2 mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-white pb-1">
          All Terms
        </h1>
        <p className="text-zinc-400">한번에 보고 싶은 사람들을 위해</p>
        <p className="text-zinc-400">
          모으고 모아 {terms.length}개의 용어들을 모았습니다.
        </p>
      </div>

      {terms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {terms.map((term) => (
            <TermCard key={term.id} term={term} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-zinc-500 glass-panel rounded-2xl">
          <p className="text-xl">No terms found.</p>
        </div>
      )}
    </div>
  );
}
