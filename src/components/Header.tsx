"use client";

import React from "react";
import { useAppState } from "@/context/AppStateContext";
import { Sparkles, Sun, Moon, Flame, HelpCircle, MessageSquare } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenAbout: () => void;
  onToggleChat: () => void;
  isChatOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  onOpenAbout,
  onToggleChat,
  isChatOpen,
}) => {
  const { focusSessions } = useAppState();

  return (
    <header className="w-full border-b border-stone-200/80 dark:border-stone-800/80 bg-white/70 dark:bg-[#0A0A0B]/70 backdrop-blur-2xl sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand Stamp & Japanese Kanji */}
        <div className="flex items-center gap-3.5">
          <div className="relative group cursor-pointer" onClick={onOpenAbout}>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 opacity-40 blur-md group-hover:opacity-75 transition duration-500" />
            <div className="relative w-11 h-11 rounded-2xl bg-stone-900 dark:bg-stone-100 flex items-center justify-center shadow-lg overflow-hidden">
              <img src="/zenflow.jpeg" alt="ZenFlow Logo" className="w-full h-full object-cover" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-sans text-2xl tracking-tight text-stone-900 dark:text-stone-50 font-extrabold">
                ZenFlow
              </h1>
              <span className="text-[10px] font-sans font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shadow-sm">
                Kaizen AI 3.7
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-sans tracking-wide hidden sm:block">
              Ikigai • Kaizen • Osoji • Ichigo Ichie
            </p>
          </div>
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* About ZenFlow Trigger */}
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100/80 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 text-xs font-sans font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-all shadow-sm"
            title="Tentang 4 Filosofi ZenFlow"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Tentang ZenFlow</span>
          </button>

          {/* Sensei AI Consultation Toggle */}
          <button
            onClick={onToggleChat}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all shadow-sm ${
              isChatOpen
                ? "bg-emerald-700 text-white shadow-emerald-700/20"
                : "bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/80 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60"
            }`}
            title="Konsultasi Sensei AI"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Sensei AI</span>
          </button>

          {/* Focus Sessions Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100/80 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 text-xs font-sans font-semibold text-stone-800 dark:text-stone-200 shadow-sm">
            <Flame className="w-4 h-4 text-amber-600 dark:text-amber-500 fill-amber-500/20" />
            <span>{focusSessions.length} Sesi</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-stone-100/80 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:scale-105 active:scale-95 transition-all shadow-sm"
            title={darkMode ? "Zen Light Mode" : "Zen Dark Mode"}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};
