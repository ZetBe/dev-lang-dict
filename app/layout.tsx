import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "개발어사전- 개발자를 위한 IT 용어 및 발음 가이드",
  description:
    "Shell, REST, JSON 등 헷갈리는 개발 용어의 정확한 발음과 뜻을 쉽고 빠르게 찾아보세요. 초보 개발자부터 현업 개발자까지 모두를 위한 IT 용어 사전입니다.",
  other: {
    "naver-site-verification": "b55dfa7a44db716c11ecd78111457c47743270ae",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "개발어사전",
    url: "https://www.devdict.site",
    logo: "https://www.devdict.site/icon1.png",
    sameAs: ["https://github.com/ZetBe/dev-lang-dict"],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="apple-mobile-web-app-title" content="devlangdict" />
      <GoogleTagManager gtmId="GTM-K3N5HMVM" />

      <body
        className={`${geistSans.variable} ${jetBrainsMono.variable} antialiased min-h-screen bg-background flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex-1">{children}</div>
          <Analytics />
          <Footer />
        </ThemeProvider>

        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
      <GoogleAnalytics gaId="G-24CZP5R0DJ" />
    </html>
  );
}
