import { Metadata } from "next";
export const metadata: Metadata = {
  title: "용어 목록 | 개발어사전",
  description: "개발자용 발음사전",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
