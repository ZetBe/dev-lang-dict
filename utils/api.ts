import { supabase } from "./supabaseClient";
import { Term } from "./types";
import { unstable_cache } from "next/cache";

export const getRecentTerms = async (): Promise<Term[]> => {
  const { data, error } = await supabase
    .from("terms")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Error fetching terms:", error);
    return [];
  }

  return data as Term[];
};

export const getAllTerms = async (): Promise<Term[]> => {
  const { data, error } = await supabase
    .from("terms")
    .select("*")
    .order("term", { ascending: true });

  if (error) {
    console.error("Error fetching all terms:", error);
    return [];
  }

  return data as Term[];
};

export const getTermBySlug = async (slug: string): Promise<Term | null> => {
  const { data, error } = await supabase
    .from("terms")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching term:", error);
    return null;
  }

  return data as Term;
};

export const searchTerms = async (query: string): Promise<Term[]> => {
  if (!query) return [];

  const { data, error } = await supabase
    .from("terms")
    .select("*")
    .or(`term.ilike.%${query}%,definition.ilike.%${query}%`)
    .limit(5);

  if (error) {
    console.error("Error searching terms:", error);
    return [];
  }

  return data as Term[];
};

const fetchDailyTermsFromDB = async (cutoffDateISO: string) => {
  const { data, error } = await supabase
    .from("terms")
    .select("*")
    .lte("created_at", cutoffDateISO)
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching terms for daily:", error);
    return [];
  }
  return data as Term[];
};

const getCachedDailyTermsSource = unstable_cache(
  async (cutoffDate: string) => fetchDailyTermsFromDB(cutoffDate),
  ["daily-terms-source"],
  { revalidate: 3600 }
);

export const getDailyTerms = async (): Promise<Term[]> => {
  const now = new Date();
  const adjustedTime = new Date(now.getTime() + 3 * 60 * 60 * 1000);

  const seedString = `${adjustedTime.getUTCFullYear()}-${
    adjustedTime.getUTCMonth() + 1
  }-${adjustedTime.getUTCDate()}`;

  const cutoffISO = getCutoffISOString(adjustedTime);
  const allTerms = await getCachedDailyTermsSource(cutoffISO);

  if (!allTerms || allTerms.length === 0) return [];

  const seed = xmur3(seedString);
  const rand = sfc32(seed(), seed(), seed(), seed());

  const terms = [...allTerms];
  for (let i = terms.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [terms[i], terms[j]] = [terms[j], terms[i]];
  }

  return terms.slice(0, 5);
};

function getCutoffISOString(adjDate: Date): string {
  const target = new Date(
    Date.UTC(
      adjDate.getUTCFullYear(),
      adjDate.getUTCMonth(),
      adjDate.getUTCDate(),
      -3,
      0,
      0
    )
  );
  return target.toISOString();
}

function xmur3(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

function sfc32(a: number, b: number, c: number, d: number) {
  return function () {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    let t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}
