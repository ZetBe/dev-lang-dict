import Link from "next/link";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { cookies } from "next/headers";
import { translations, Language } from "@/utils/translations";

interface Contributor {
  name: string;
  role: "Creator" | "Contributor";
  description: string;
  github: string;
  terms?: string[];
}

export default async function ContributorsPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value as Language) || "ko";
  const t = translations[lang];

  const contributors: Contributor[] = [
    {
      name: "Kevin",
      role: "Creator",
      description: t.role_creator,
      github: "https://github.com/ZetBe",
    },
    {
      name: "daehyuh",
      role: "Contributor",
      description: t.role_contributor,
      terms: ["JWT"],
      github: "https://github.com/daehyuh",
    },
    // Add more contributors here
  ];

  return (
    <PageLayout
      title={t.contributors_title}
      badge={t.contributors_badge}
      badgeIcon={Sparkles}
      description={<>{t.contributors_desc}</>}
    >
      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributors.map((contributor, index) => {
          // Extract GitHub username dynamically
          const githubUsername = contributor.github.split("/").pop();
          const avatarUrl = `https://github.com/${githubUsername}.png`;

          return (
            <div
              key={index}
              className="group relative flex flex-col bg-card/50 backdrop-blur-sm border border-border p-6 rounded-3xl hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500" />

              <div className="relative z-10 flex items-start gap-4 mb-6">
                <img
                  src={avatarUrl}
                  alt={contributor.name}
                  className="w-16 h-16 rounded-2xl bg-muted object-cover border-2 border-transparent group-hover:border-primary transition-colors"
                />
                <div>
                  <h3 className="font-bold text-foreground text-xl">
                    {contributor.name}
                  </h3>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-xs font-bold rounded-md uppercase tracking-wide ${
                      contributor.role === "Creator"
                        ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                        : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {contributor.role}
                  </span>
                </div>
              </div>

              <p className="relative z-10 text-muted-foreground text-sm mb-6 flex-1 leading-relaxed">
                {contributor.description}
              </p>

              {/* Stats / Terms */}
              <div className="relative z-10 space-y-3 mb-6">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {t.contributions_label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {contributor.terms && contributor.terms.length > 0 ? (
                    contributor.terms.slice(0, 3).map((term, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-muted/80 rounded-lg text-xs font-medium text-foreground border border-transparent hover:border-border transition-colors cursor-default"
                      >
                        {term}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      {t.project_maintenance}
                    </span>
                  )}
                  {contributor.terms && contributor.terms.length > 3 && (
                    <span className="px-2.5 py-1 bg-muted/50 rounded-lg text-xs font-medium text-muted-foreground">
                      +{contributor.terms.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <Link
                href={contributor.github}
                target="_blank"
                className="relative z-10 mt-auto flex items-center justify-between w-full p-3 rounded-xl bg-muted/50 hover:bg-muted text-sm font-medium transition-colors group/link"
              >
                <span className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  {t.github_profile}
                </span>
                <ExternalLink className="w-4 h-4 opacity-50 group-hover/link:opacity-100 transition-opacity" />
              </Link>
            </div>
          );
        })}

        {/* Join Us Card */}
        <div className="group flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-xl mb-2">
              {t.be_a_contributor}
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              {t.contributor_cta}
            </p>
          </div>
          <Link
            href="https://github.com/ZetBe/dev-lang-dict"
            target="_blank"
            className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            {t.github_repo}
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
