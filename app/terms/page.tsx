import { getAllTerms } from "@/utils/api";
import TermCard from "@/components/TermCard";
import TermsClient from "./TermsClient";

export const revalidate = 0;
export const dynamic = "force-static";

export default async function TermsPage() {
  const terms = await getAllTerms();

  return <TermsClient initialTerms={terms} />;
}
