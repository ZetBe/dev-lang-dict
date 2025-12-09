import { supabase } from "./supabaseClient";
import { Term } from "./types";

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
