import { getDailyTerms } from "@/utils/api";
import TermCard from "@/components/TermCard";
import CuriosityBanner from "@/components/CuriosityBanner";
import CountdownTimer from "@/components/CountdownTimer";
import { cookies } from "next/headers";
import { translations, Language } from "@/utils/translations";

export default async function Home() {
  const terms = await getDailyTerms();
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value as Language) || "ko";
  const t = translations[lang];

  return (
    <div className="min-h-screen flex flex-col p-8 font-[family-name:var(--font-geist-sans)] max-w-7xl mx-auto">
      <header className="flex flex-col items-center text-center py-10 pb-10">
        <CuriosityBanner />

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mt-2">
          {t.app_name}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          {t.subtitle}
        </p>
      </header>

      <main className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {t.today_term}
            <p className="text-sm text-muted-foreground">
              {t.daily_update_msg}
            </p>
          </h2>

          <CountdownTimer />
        </div>
        {terms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {terms.map((term) => (
              <TermCard key={term.id} term={term} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground glass-panel rounded-2xl">
            <p className="text-xl">{t.no_terms}</p>
          </div>
        )}
      </main>
    </div>
  );
}
