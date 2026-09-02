"use client";

import React, { useState, useEffect } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Header } from "@/components/Header";
import { IkigaiSection } from "@/components/IkigaiSection";
import { KaizenTaskSplitter } from "@/components/KaizenTaskSplitter";
import { AiAnalyticsSection } from "@/components/AiAnalyticsSection";
import { SessionHistory } from "@/components/SessionHistory";
import { OsojiModal } from "@/components/OsojiModal";
import { FocusRoom } from "@/components/FocusRoom";
import { ReflectionModal } from "@/components/ReflectionModal";
import { AboutZenFlowModal } from "@/components/AboutZenFlowModal";
import { SenseiChatbot } from "@/components/SenseiChatbot";
import { Feather, MessageSquare, Compass, Sparkles, HelpCircle } from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { flowStage } = useAppState();

  // Initialize IntersectionObserver for on-scroll animation reveals
  useEffect(() => {
    if (typeof window !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
      );

      document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0A0A0B] text-stone-900 dark:text-stone-100 flex flex-col justify-between transition-colors duration-500 relative font-sans">
        
        {/* Ambient Lighting Glows */}
        <div className="fixed top-12 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="fixed bottom-20 left-10 w-[450px] h-[320px] bg-amber-500/5 dark:bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Main Dashboard Layout */}
        <div className="relative z-10">
          <Header
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onOpenAbout={() => setIsAboutOpen(true)}
            onToggleChat={() => setIsChatOpen(!isChatOpen)}
            isChatOpen={isChatOpen}
          />

          <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
            {/* Hero Banner */}
            <div className="text-center py-6 space-y-4 animate-on-scroll [animation:animationIn_0.8s_ease-out_0.1s_both]">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/80 dark:border-emerald-800/80 shadow-sm text-xs font-sans font-semibold text-emerald-800 dark:text-emerald-300">
                <Feather className="w-3.5 h-3.5 text-emerald-600" />
                <span>Anti-Malas dengan 4 Filosofi Jepang &amp; Gemini AI</span>
              </div>

              <h2 className="font-sans text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight leading-tight">
                Mulai Ketenangan Fokus Hari Ini
              </h2>

              <p className="text-xs sm:text-sm font-sans text-stone-600 dark:text-stone-400 max-w-xl mx-auto leading-relaxed">
                Ubah penundaan menjadi momentum dengan <strong>Ikigai</strong> (Tujuan), <strong>Kaizen</strong> (Micro-steps AI), <strong>Osoji</strong> (Persiapan ruang), dan <strong>Ichigo Ichie</strong> (Momen murni 25m).
              </p>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsAboutOpen(true)}
                  className="text-xs font-sans font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1.5"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Pelajari Cara Kerja 4 Filosofi Zen</span>
                </button>
              </div>
            </div>

            {/* Core Section 1: Ikigai */}
            <div className="animate-on-scroll [animation:animationIn_0.8s_ease-out_0.2s_both]">
              <IkigaiSection />
            </div>

            {/* Core Section 2: Kaizen Task Splitter */}
            <div className="animate-on-scroll [animation:animationIn_0.8s_ease-out_0.3s_both]">
              <KaizenTaskSplitter />
            </div>

            {/* AI Productivity Analytics & Kaizen Insights */}
            <div className="animate-on-scroll [animation:animationIn_0.8s_ease-out_0.4s_both]">
              <AiAnalyticsSection />
            </div>

            {/* Past Focus Sessions & Reflections */}
            <div className="animate-on-scroll [animation:animationIn_0.8s_ease-out_0.5s_both]">
              <SessionHistory />
            </div>
          </main>
        </div>

        {/* Floating Sensei AI Chatbot Trigger Button (Bottom Right) */}
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-stone-900 hover:bg-stone-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-sans text-xs font-bold shadow-xl shadow-stone-950/20 active:scale-95 transition-all"
            title="Konsultasi Sensei AI"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-600 dark:bg-stone-900 text-white flex items-center justify-center font-japanese text-xs">
              禅
            </div>
            <span>Tanya Sensei AI</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          </button>
        )}

        {/* Interactive Sensei Chatbot Drawer */}
        <SenseiChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

        {/* About ZenFlow Modal */}
        <AboutZenFlowModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

        {/* Flow Stage Modals */}
        {flowStage === 'OSOJI_PREP' && <OsojiModal />}
        {flowStage === 'FOCUS_ROOM' && <FocusRoom />}
        {flowStage === 'POST_REFLECTION' && <ReflectionModal />}

        {/* Footer */}
        <footer className="w-full border-t border-stone-200/80 dark:border-stone-800/80 py-8 mt-16 bg-white/40 dark:bg-stone-900/40 relative z-10 font-sans">
          <div className="max-w-4xl mx-auto px-4 text-center text-xs font-sans text-stone-500 dark:text-stone-400 space-y-1.5">
            <p className="flex items-center justify-center gap-1.5 font-sans text-sm text-stone-800 dark:text-stone-200 font-bold">
              ZenFlow — 生き甲斐 &amp; 改善
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Dibuat dengan rasa hormat pada waktu &amp; kesadaran penuh • Ditenagai Gemini AI 1.5
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
