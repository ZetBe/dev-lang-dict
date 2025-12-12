import Link from "next/link";

export const metadata = {
  title: "기여자 | 개발어사전",
  description: "개발어사전 프로젝트에 기여해주신 분들",
};

export const runtime = "edge";

export default function ContributorsPage() {
  const contributors = [
    {
      name: "Kevin",
      role: "Creator",
      description: "프로젝트 기획 및 개발",
      github: "https://github.com/ZetBe", // Placeholder
    },
    // Add more contributors here
  ];

  return (
    <div className="min-h-screen p-8 md:p-12 max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white font-mono mb-4">
          CONTRIBUTORS
        </h1>
        <p className="text-zinc-400 text-lg">
          개발어사전을 함께 만들어가는 분들입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributors.map((contributor, index) => (
          <div
            key={index}
            className="flex flex-col bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-blue-500/50 transition duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-xl font-bold text-zinc-400 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition">
                {contributor.name[0]}
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">
                  {contributor.name}
                </h3>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider bg-zinc-800 px-2 py-0.5 rounded">
                  {contributor.role}
                </span>
              </div>
            </div>

            <p className="text-zinc-400 text-sm mb-6 flex-1">
              {contributor.description}
            </p>

            <Link
              href={contributor.github}
              target="_blank"
              className="text-sm font-medium text-zinc-500 hover:text-white transition-colors flex items-center gap-2"
            >
              GitHub 프로필 &rarr;
            </Link>
          </div>
        ))}

        {/* Join Us Card */}
        <div className="flex flex-col items-center justify-center bg-blue-600/5 border border-blue-500/20 border-dashed p-6 rounded-2xl hover:bg-blue-600/10 transition duration-300">
          <h3 className="font-bold text-blue-400 text-lg mb-2">기여하기</h3>
          <p className="text-zinc-400 text-sm text-center mb-4">
            새로운 용어를 추가하거나
            <br />
            잘못된 정보를 수정해주세요.
          </p>
          <Link
            href="https://github.com/ZetBe/dev-lang-dict"
            target="_blank"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition"
          >
            GitHub 바로가기
          </Link>
        </div>
      </div>
    </div>
  );
}
