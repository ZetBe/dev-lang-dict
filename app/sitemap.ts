import { MetadataRoute } from "next";
import { getAllTerms } from "@/utils/api"; // 👈 실제 getAllTerms가 있는 경로로 수정해주세요

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. 기본 도메인 설정 (배포된 실제 도메인 주소)
  const baseUrl = "https://devdict.site";

  // 2. 데이터베이스에서 모든 용어(Terms) 가져오기
  const terms = await getAllTerms();

  // 3. 동적 라우트 생성 (각 용어 상세 페이지)
  // [slug] 폴더가 어디에 있는지에 따라 URL 경로를 수정해야 합니다.
  // 예: app/terms/[slug]/page.tsx 라면 -> /terms/${term.slug}
  const termUrls = terms.map((term) => ({
    url: `${baseUrl}/terms/${term.slug}`,
    lastModified: new Date(term.created_at || new Date()), // created_at이 없으면 현재 시간
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 4. 정적 라우트 생성 (메인, 목록, 기여자 페이지 등)
  const staticRoutes = [
    "", // 홈 (/)
    "/terms", // 전체 목록 (/terms)
    "/contributors", // 기여자 소개 (/contributors)
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8, // 홈은 중요도 1
  }));

  // 5. 두 배열을 합쳐서 반환
  return [...staticRoutes, ...termUrls];
}
