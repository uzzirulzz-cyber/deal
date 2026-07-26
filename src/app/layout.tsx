import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Sentinel theme uses Montserrat throughout — clean, geometric, editorial.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sentinel — Marketplace | Buy, Sell & Invest in Businesses Worldwide",
  description: "A refined, editorial showcase of real marketplace listings — domains, websites, fintech, real estate & digital products — pulled live from makethisdeal.biz and stored in PostgreSQL. Sentinel theme.",
  keywords: ["makethisdeal", "sentinel", "business marketplace", "buy business", "sell business", "domains", "fintech", "real estate", "invest"],
  authors: [{ name: "Sentinel Marketplace" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Sentinel — Marketplace",
    description: "Buy, Sell & Invest in Businesses Worldwide. Real listings in a refined editorial theme.",
    url: "https://chat.z.ai",
    siteName: "Sentinel Marketplace",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sentinel — Marketplace",
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
        className={`${montserrat.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
