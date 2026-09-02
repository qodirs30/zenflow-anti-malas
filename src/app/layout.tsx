import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { AppStateProvider } from "@/context/AppStateContext";

const fontSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const fontJapanese = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-japanese",
});

export const metadata: Metadata = {
  title: "ZenFlow — Mindful Japanese Productivity & AI Sanctuary",
  description: "Atasi penundaan dengan 4 filosofi Jepang: Ikigai (Tujuan), Kaizen (Micro-steps AI), Osoji (Persiapan Ruang), dan Ichigo Ichie (25m Focus Room) ditenagai Gemini AI.",
  keywords: ["productivity", "ikigai", "kaizen", "pomodoro", "anti malas", "gemini ai", "zenflow"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`scroll-smooth ${fontSerif.variable} ${fontSans.variable} ${fontJapanese.variable}`}>
      <body className="min-h-screen bg-[#FAF8F5] dark:bg-[#0A0A0B] text-stone-900 dark:text-stone-100 font-sans antialiased selection:bg-emerald-500/20 selection:text-emerald-900 dark:selection:text-emerald-200">
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
