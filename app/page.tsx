import { getRecentTerms } from "@/utils/api";
import TermCard from "@/components/TermCard";
import Search from "@/components/Search";

export const revalidate = 0; // Disable static caching for now

export default async function Home() {
  const terms = await getRecentTerms();

  return (
    <div className="min-h-screen flex flex-col p-8 font-[family-name:var(--font-geist-sans)] max-w-7xl mx-auto">
      <header className="flex flex-col gap-6 items-center text-center py-20">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 text-glow">
          개발어사전(Dev Lang Dict)
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400">개발자용 발음사전</p>

        <Search />
      </header>

      <main className="w-full">
        {terms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {terms.map((term) => (
              <TermCard key={term.id} term={term} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-zinc-500 glass-panel rounded-2xl">
            <p className="text-xl">등록된 용어가 없습니다.</p>
            <p className="text-sm mt-2">Supabase 테이블을 확인해주세요.</p>
          </div>
        )}
      </main>
    </div>
  );
}
