import { getTermBySlug } from "@/utils/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import TTSButton from "@/components/TTSButton";

const WarningIcon = () => (
  <svg
    className="w-5 h-5 text-red-400 mt-0.5 shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const term = await getTermBySlug(slug);

  if (!term) {
    return {
      title: "Term Not Found",
      description: "The requested term could not be found.",
    };
  }

  const title = `${term.term} | 개발어사전`;
  const description =
    term.definition.length > 160
      ? `${term.definition.slice(0, 160)}...`
      : term.definition;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function TermPage(props: PageProps) {
  const params = await props.params;
  const { slug } = params;
  const term = await getTermBySlug(slug);

  if (!term) {
    notFound();
  }

  const ttsText =
    term.tts_guide && term.tts_guide.length > 0
      ? term.tts_guide.join("-")
      : term.term;

  return (
    <div className="min-h-screen flex flex-col p-6 md:p-12 max-w-3xl mx-auto">
      {/* 상단 네비게이션 */}
      <div className="mb-12">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm font-medium"
        >
          ← 돌아가기
        </Link>
      </div>

      <main>
        {/* 1. 태그 & 타이틀 섹션 (Left Align으로 변경) */}
        <div className="space-y-6 mb-12">
          {/* 태그를 최상단으로 이동하여 맥락 제공 */}
          {term.tags && (
            <div className="flex gap-2">
              {term.tags.map((tag) => (
                <Link
                  href={`/terms?tag=${tag}`}
                  key={tag}
                  className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* 타이틀 */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground font-mono leading-none">
            {term.term}
          </h1>

          {/* 발음 정보 라인 (한 줄로 정리) */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            {/* TTS 버튼: 텍스트와 함께 배치하여 인지율 높임 */}
            <div className="flex items-center gap-2 bg-muted/50 pr-4 pl-2 py-1 rounded-full border border-border hover:bg-muted transition cursor-pointer group">
              {/* TTSButton 컴포넌트 내부에 onClick 이벤트가 있다고 가정 */}
              <div className="p-1 bg-muted rounded-full group-hover:bg-muted/80 transition">
                <TTSButton text={ttsText} />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">
                듣기
              </span>
            </div>

            <div className="h-4 w-px bg-border hidden md:block"></div>

            {term.ipa && (
              <span className="font-serif italic text-lg font-light text-muted-foreground">
                /{term.ipa}/
              </span>
            )}

            {term.pronunciation_ko && (
              <span className="text-muted-foreground font-medium">
                [{term.pronunciation_ko}]
              </span>
            )}
          </div>
        </div>

        {/* 2. 정의 섹션 (가장 중요하므로 박스 없이 텍스트 자체로 강조) */}
        <section className="mb-16">
          <h3 className="sr-only">정의</h3>
          <p className="text-2xl md:text-3xl text-foreground leading-relaxed font-light">
            {term.definition}
          </p>
        </section>

        {/* 3. 추가 정보 그리드 (박스 디자인 적용) */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* 발음 가이드 카드 */}
          {term.tts_guide && term.tts_guide.length > 0 && (
            <div className="bg-card border border-border p-6 rounded-2xl md:col-span-2">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                발음 가이드
              </h3>
              <div className="flex flex-wrap gap-2 items-center">
                {/* 버튼 모양 대신 '음절 분해' 느낌의 UI 적용 */}
                {term.tts_guide.map((part, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-2xl md:text-3xl font-mono text-foreground">
                      {part}
                    </span>
                    {index < term.tts_guide!.length - 1 && (
                      <span className="mx-3 text-muted-foreground">·</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 역사 & 맥락 */}
          {term.etymology && (
            <div className="bg-card border border-border p-6 rounded-2xl">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                역사 & 맥락
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {term.etymology}
              </p>
            </div>
          )}

          {/* 흔한 실수 (경고 스타일) */}
          {term.common_mistakes && (
            <div className="bg-destructive/5 border border-destructive/20 p-6 rounded-2xl md:col-span-2 flex gap-4 items-start">
              <WarningIcon />
              <div>
                <h3 className="text-xs font-bold text-destructive uppercase tracking-widest mb-2 mt-0.5">
                  흔한 실수
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {term.common_mistakes}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 배경 장식 (너무 강하지 않게 조절) */}
      <div className="fixed top-20 right-0 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none -z-10 opacity-50"></div>
    </div>
  );
}
