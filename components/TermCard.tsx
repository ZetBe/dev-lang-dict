import Link from "next/link";
import { Term } from "@/utils/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface TermCardProps {
  term: Term;
}

export default function TermCard({ term }: TermCardProps) {
  return (
    <Card className="h-full bg-card/50 backdrop-blur-md border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden relative group rounded-3xl">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500 pointer-events-none" />

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl font-jetbrains-mono font-bold text-foreground group-hover:text-primary transition-colors">
            <Link
              href={`/terms/${term.slug}`}
              className="before:absolute before:inset-0 focus:outline-none"
            >
              {term.term}
            </Link>
          </CardTitle>
          {term.pronunciation_ko && (
            <span className="text-xs font-jetbrains-mono text-muted-foreground border border-zinc-800 px-2 py-1 rounded ">
              {term.pronunciation_ko}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-zinc-400 line-clamp-2 text-sm pointer-events-none">
          {term.definition}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 flex-wrap relative z-10">
          {term.tags?.slice(0, 3).map((tag, i) => (
            <Link
              key={i}
              href={`/terms?tag=${tag}`}
              className="text-xs text-blue-400/80 bg-blue-500/10 px-2 py-1 rounded-full hover:bg-blue-500/20 hover:text-blue-300 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
