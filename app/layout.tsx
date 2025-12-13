import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "개발어사전",
  description: "개발자용 발음사전",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <meta name="apple-mobile-web-app-title" content="devlangdict" />

      <body
        className={`${geistSans.variable} ${jetBrainsMono.variable} antialiased min-h-screen bg-background flex flex-col`}
      >
        <Header />
        <div className="flex-1">{children}</div>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
