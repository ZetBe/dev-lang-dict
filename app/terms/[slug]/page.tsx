import { getTermBySlug } from "@/utils/api";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TermPage(props: PageProps) {
  const params = await props.params;
  const { slug } = params;
  const term = await getTermBySlug(slug);

  if (!term) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col p-8 font-[family-name:var(--font-geist-sans)] max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/"
          className="text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-2"
        >
          ← Back to Dictionary
        </Link>
      </div>

      <main className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8 mb-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              {term.term}
            </h1>
            {term.ipa && (
              <span className="text-2xl text-zinc-500 font-serif italic mb-2">
                /{term.ipa}/
              </span>
            )}
            {term.pronunciation_ko && (
              <span className="text-xl text-blue-400 font-mono mb-2 bg-blue-500/10 px-3 py-1 rounded-lg">
                [{term.pronunciation_ko}]
              </span>
            )}
          </div>

          <div className="space-y-10">
            <section>
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-3">
                Definition
              </h3>
              <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed">
                {term.definition}
              </p>
            </section>

            {term.tts_guide && term.tts_guide.length > 0 && (
              <section>
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-3">
                  Pronunciation Guide
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {term.tts_guide.map((part, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-zinc-800 rounded-lg text-lg hover:bg-zinc-700 transition"
                    >
                      {part}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {term.etymology && (
              <section className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-3">
                  Etymology & Context
                </h3>
                <p className="text-zinc-300">{term.etymology}</p>
              </section>
            )}

            {term.common_mistakes && (
              <section className="bg-red-500/5 p-6 rounded-xl border border-red-500/10">
                <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-3">
                  Common Mistakes
                </h3>
                <p className="text-zinc-300">{term.common_mistakes}</p>
              </section>
            )}

            <section className="pt-8 border-t border-zinc-800 flex flex-wrap gap-2">
              {term.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800"
                >
                  #{tag}
                </span>
              ))}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
