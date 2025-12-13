import { getAllTerms } from "@/utils/api";
import TermsClient from "./TermsClient";

export const metadata = {
  title: "용어 목록 | 개발어사전",
  description: "개발자용 발음사전",
};

export default async function TermsPage() {
  const terms = await getAllTerms();

  return <TermsClient initialTerms={terms} />;
}
