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
import { Heart, Sparkles, Feather } from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const { flowStage } = useAppState();

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0C0A09] text-stone-900 dark:text-stone-100 flex flex-col justify-between transition-colors duration-300">
        
        {/* Main Dashboard Layout */}
        <div>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />

          <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
            {/* Hero / Introduction Banner */}
            <div className="text-center py-4 space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 inline-flex items-center gap-1.5">
                <Feather className="w-3.5 h-3.5" />
                Anti-Malas dengan 4 Filosofi Jepang
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 font-medium tracking-tight">
                Mulai Ketenangan Fokus Hari Ini
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl mx-auto leading-relaxed">
                Pecah penundaan dengan <strong>Ikigai</strong> (Tujuan), <strong>Kaizen</strong> (Langkah mikro dengan AI), <strong>Osoji</strong> (Pembersihan ruang), dan <strong>Ichigo Ichie</strong> (Momen murni 25m).
              </p>
            </div>

            {/* Core Section 1: Ikigai */}
            <IkigaiSection />

            {/* Core Section 2: Kaizen Task Splitter */}
            <KaizenTaskSplitter />

            {/* Past Focus Sessions & Reflection History */}
            <SessionHistory />
          </main>
        </div>

        {/* Modal Flow Stages based on User Action */}
        {flowStage === 'OSOJI_PREP' && <OsojiModal />}
        {flowStage === 'FOCUS_ROOM' && <FocusRoom />}
        {flowStage === 'POST_REFLECTION' && <ReflectionModal />}

        {/* Footer */}
        <footer className="w-full border-t border-stone-200/80 dark:border-stone-800/80 py-6 mt-12 bg-white/40 dark:bg-stone-900/40">
          <div className="max-w-4xl mx-auto px-4 text-center text-xs text-stone-500 dark:text-stone-400 space-y-1">
            <p className="flex items-center justify-center gap-1">
              Dibuat dengan rasa hormat pada waktu &amp; filosofi Jepang • ZenFlow
            </p>
            <p className="text-[11px] text-stone-400 dark:text-stone-600">
              Model AI: Gemini 3.6 Flash (Kaizen Task Splitter) &amp; Gemini 3.7 Flash (Ikigai Reflection)
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
