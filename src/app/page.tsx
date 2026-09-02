"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Header } from "@/components/Header";
import { IkigaiSection } from "@/components/IkigaiSection";
import { KaizenTaskSplitter } from "@/components/KaizenTaskSplitter";
import { SessionHistory } from "@/components/SessionHistory";
import { OsojiModal } from "@/components/OsojiModal";
import { FocusRoom } from "@/components/FocusRoom";
import { ReflectionModal } from "@/components/ReflectionModal";
import { Heart, Sparkles, Feather, Compass, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const { flowStage } = useAppState();

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0A0A0B] text-stone-900 dark:text-stone-100 flex flex-col justify-between transition-colors duration-500 relative">
        
        {/* Ambient Subtle Background Lighting Glows */}
        <div className="fixed top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="fixed bottom-20 left-10 w-[400px] h-[300px] bg-amber-500/5 dark:bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Dashboard Layout */}
        <div className="relative z-10">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />

          <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
            {/* Zen Hero Section */}
            <div className="text-center py-6 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/80 dark:border-emerald-800/80 shadow-sm text-xs font-sans font-semibold text-emerald-800 dark:text-emerald-300">
                <Feather className="w-3.5 h-3.5 text-emerald-600" />
                <span>Anti-Malas dengan 4 Filosofi Jepang &amp; Gemini AI</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-tight">
                Mulai Ketenangan Fokus Hari Ini
              </h2>

              <p className="text-xs sm:text-sm font-sans text-stone-600 dark:text-stone-400 max-w-xl mx-auto leading-relaxed">
                Pecah penundaan dengan <strong>Ikigai</strong> (Tujuan), <strong>Kaizen</strong> (Langkah mikro dengan AI), <strong>Osoji</strong> (Pembersihan ruang), dan <strong>Ichigo Ichie</strong> (Momen murni 25m).
              </p>
            </div>

            {/* Core Section 1: Ikigai */}
            <IkigaiSection />

            {/* Core Section 2: Kaizen Task Splitter */}
            <KaizenTaskSplitter />

            {/* Past Focus Sessions & Reflections */}
            <SessionHistory />
          </main>
        </div>

        {/* Flow Stage Modals */}
        {flowStage === 'OSOJI_PREP' && <OsojiModal />}
        {flowStage === 'FOCUS_ROOM' && <FocusRoom />}
        {flowStage === 'POST_REFLECTION' && <ReflectionModal />}

        {/* Serene Footer */}
        <footer className="w-full border-t border-stone-200/80 dark:border-stone-800/80 py-8 mt-16 bg-white/40 dark:bg-stone-900/40 relative z-10">
          <div className="max-w-4xl mx-auto px-4 text-center text-xs font-sans text-stone-500 dark:text-stone-400 space-y-1.5">
            <p className="flex items-center justify-center gap-1.5 font-serif text-sm text-stone-800 dark:text-stone-200 font-bold">
              ZenFlow — 生き甲斐 &amp; 改善
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Dibuat dengan rasa hormat pada waktu &amp; kesadaran penuh • Ditenagai Gemini AI 3.6 &amp; 3.7
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
