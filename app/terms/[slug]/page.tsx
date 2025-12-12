import { getTermBySlug } from "@/utils/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import TTSButton from "@/components/TTSButton";

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

  // Determine TTS text: use guide if available, otherwise term name
  const ttsText =
    term.tts_guide && term.tts_guide.length > 0
      ? term.tts_guide.join(" ")
      : term.term;

  return (
    <div className="min-h-screen flex flex-col p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/"
          className="text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-2"
        >
          ← 돌아가기
        </Link>
      </div>

      <div className="flex flex-col gap-4 mb-8 justify-center items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white font-mono">
            {term.term}
          </h1>
          <TTSButton text={ttsText} />
          {term.ipa && (
            <span className="text-2xl text-zinc-500 font-serif italic mt-2 font-jetbrains-mono">
              /{term.ipa}/
            </span>
          )}
          {term.pronunciation_ko && (
            <span className="text-xl text-blue-400 font-mono bg-blue-500/10 px-3 py-1 rounded-lg mt-2">
              [{term.pronunciation_ko}]
            </span>
          )}
        </div>
      </div>

      <main className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="space-y-10">
            <section>
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-3">
                정의
              </h3>
              <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed">
                {term.definition}
              </p>
            </section>

            {term.tts_guide && term.tts_guide.length > 0 && (
              <section>
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-3">
                  발음 가이드
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
                  역사 & 맥락
                </h3>
                <p className="text-zinc-300">{term.etymology}</p>
              </section>
            )}

            {term.common_mistakes && (
              <section className="bg-red-500/5 p-6 rounded-xl border border-red-500/10">
                <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-3">
                  흔한 실수
                </h3>
                <p className="text-zinc-300">{term.common_mistakes}</p>
              </section>
            )}

            <section className="pt-8 border-t border-zinc-800 flex flex-wrap gap-2">
              {term.tags?.map((tag) => (
                <Link
                  key={tag}
                  href={`/terms?tag=${tag}`}
                  className="text-sm font-jetbrains-mono text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800"
                >
                  #{tag}
                </Link>
              ))}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
