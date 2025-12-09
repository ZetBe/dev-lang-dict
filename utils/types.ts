export interface Term {
  id: number;
  created_at: string;
  term: string;
  slug: string;
  definition: string;
  tts_guide: string[] | null;
  ipa: string | null;
  pronunciation_ko: string | null;
  etymology: string | null;
  common_mistakes: string | null;
  tags: string[] | null;
}
