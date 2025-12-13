import { Suspense } from "react";
import { getAllTerms } from "@/utils/api";
import TermsClient from "./TermsClient";

export default async function TermsPage() {
  const terms = await getAllTerms();

  return (
    <Suspense fallback={<div>...</div>}>
      <TermsClient initialTerms={terms} />
    </Suspense>
  );
}
