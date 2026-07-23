import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Make This Deal — Atelier Marketplace | Buy, Sell & Invest in Businesses Worldwide",
  description: "A magnificent, brand-forward showcase of real marketplace listings — domains, websites, fintech & digital products — pulled live from makethisdeal.biz and stored in PostgreSQL.",
  keywords: ["makethisdeal", "business marketplace", "buy business", "sell business", "domains", "fintech", "websites for sale", "invest"],
  authors: [{ name: "Make This Deal Atelier" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Make This Deal — Atelier Marketplace",
    description: "Buy, Sell & Invest in Businesses Worldwide. Real listings dressed in gold-grade CSS.",
    url: "https://chat.z.ai",
    siteName: "Make This Deal Atelier",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Make This Deal — Atelier Marketplace",
    description: "Buy, Sell & Invest in Businesses Worldwide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
