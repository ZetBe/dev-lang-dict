import Link from "next/link";

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
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground font-mono mb-4">
          CONTRIBUTORS
        </h1>
        <p className="text-muted-foreground text-lg">
          개발어사전을 함께 만들어가는 분들입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributors.map((contributor, index) => (
          <div
            key={index}
            className="flex flex-col bg-card border border-border p-6 rounded-2xl hover:border-primary/50 transition duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-xl font-bold text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition">
                {contributor.name[0]}
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">
                  {contributor.name}
                </h3>
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider bg-muted px-2 py-0.5 rounded">
                  {contributor.role}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground text-sm mb-6 flex-1">
              {contributor.description}
            </p>

            <Link
              href={contributor.github}
              target="_blank"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              GitHub 프로필 &rarr;
            </Link>
          </div>
        ))}

        {/* Join Us Card */}
        <div className="flex flex-col items-center justify-center bg-primary/5 border border-primary/20 border-dashed p-6 rounded-2xl hover:bg-primary/10 transition duration-300">
          <h3 className="font-bold text-primary text-lg mb-2">기여하기</h3>
          <p className="text-muted-foreground text-sm text-center mb-4">
            새로운 용어를 추가하거나
            <br />
            잘못된 정보를 수정해주세요.
          </p>
          <Link
            href="https://github.com/ZetBe/dev-lang-dict"
            target="_blank"
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold rounded-lg transition"
          >
            GitHub 바로가기
          </Link>
        </div>
      </div>
    </div>
  );
}
