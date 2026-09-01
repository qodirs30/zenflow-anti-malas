import type { Metadata } from "next";
import "./globals.css";
import { AppStateProvider } from "@/context/AppStateContext";

export const metadata: Metadata = {
  title: "ZenFlow - Japanese Productivity & Anti-Procrastination App",
  description: "Atasi rasa malas dan penundaan dengan 4 filosofi Jepang: Ikigai (Tujuan), Kaizen (Langkah Mikro), Osoji (Persiapan Ruang), dan Ichigo Ichie (Fokus Murni 25-Menit) ditenagai Gemini AI.",
  keywords: ["productivity", "ikigai", "kaizen", "pomodoro", "anti malas", "gemini ai", "zenflow"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans antialiased selection:bg-emerald-200 dark:selection:bg-emerald-900">
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
