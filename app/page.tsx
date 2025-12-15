import { getRecentTerms } from "@/utils/api";
import TermCard from "@/components/TermCard";
import CuriosityBanner from "@/components/CuriosityBanner";

export default async function Home() {
  const terms = await getRecentTerms();

  return (
    <div className="min-h-screen flex flex-col p-8 font-[family-name:var(--font-geist-sans)] max-w-7xl mx-auto">
      <header className="flex flex-col items-center text-center py-10 pb-10">
        <CuriosityBanner />

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mt-2">
          개발어사전
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          개발자용 발음사전
        </p>
      </header>

      <main className="w-full">
        {terms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {terms.map((term) => (
              <TermCard key={term.id} term={term} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground glass-panel rounded-2xl">
            <p className="text-xl">등록된 용어가 없습니다.</p>
          </div>
        )}
      </main>
    </div>
  );
}
