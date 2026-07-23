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
  title: "Aurum — CSS Atelier | A curated library of magnificent CSS effects",
  description: "A curated atelier of magnificent, production-ready CSS effects. Every piece ships with a live demo and copy-ready code — pure CSS, zero dependencies.",
  keywords: ["CSS effects", "CSS library", "CSS animations", "buttons", "cards", "loaders", "UI design", "front-end", "Aurum"],
  authors: [{ name: "Aurum Atelier" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Aurum — CSS Atelier",
    description: "A curated library of magnificent, production-ready CSS effects with live demos and copy-ready code.",
    url: "https://chat.z.ai",
    siteName: "Aurum CSS Atelier",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurum — CSS Atelier",
    description: "A curated library of magnificent CSS effects with live demos and copy-ready code.",
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
