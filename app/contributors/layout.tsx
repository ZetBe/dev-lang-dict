import { Metadata } from "next";
export const metadata: Metadata = {
  title: "기여자 | 개발어사전",
  description: "개발어사전 프로젝트에 기여해주신 분들",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
