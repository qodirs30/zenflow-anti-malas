"use client";

import React from "react";
import { useAppState } from "@/context/AppStateContext";
import { Sparkles, Sun, Moon, Flame, Compass } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  const { focusSessions, ikigai } = useAppState();

  return (
    <header className="w-full border-b border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-md sticky top-0 z-30 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Japanese Kanji */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-700 dark:bg-emerald-600 text-white flex items-center justify-center font-serif text-lg shadow-sm">
            禅
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl tracking-tight text-stone-900 dark:text-stone-100 font-medium">
                ZenFlow
              </h1>
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
                Kaizen AI
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-sans hidden sm:block">
              Ikigai • Kaizen • Osoji • Ichigo Ichie
            </p>
          </div>
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Focus Sessions Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300">
            <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
            <span className="font-medium">{focusSessions.length} Sesi Fokus</span>
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors duration-200"
            title={darkMode ? "Switch to Zen Light Mode" : "Switch to Zen Dark Mode"}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};
