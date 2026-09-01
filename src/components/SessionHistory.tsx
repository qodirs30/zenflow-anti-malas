"use client";

import React from "react";
import { useAppState } from "@/context/AppStateContext";
import { History, Sparkles, Clock, Quote } from "lucide-react";

export const SessionHistory: React.FC = () => {
  const { focusSessions } = useAppState();

  if (focusSessions.length === 0) return null;

  return (
    <section className="w-full bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
          <History className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-stone-500 dark:text-stone-400">
            Jejak Keberhasilan
          </span>
          <h2 className="text-base font-medium text-stone-900 dark:text-stone-100">
            Riwayat Sesi Fokus &amp; Refleksi Ikigai
          </h2>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        {focusSessions.slice(0, 5).map((session) => (
          <div
            key={session.id}
            className="p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40 space-y-2 text-xs"
          >
            <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
              <span className="font-medium text-stone-800 dark:text-stone-200">
                {session.taskTitle}
              </span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3 text-stone-400" />
                {new Date(session.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {session.reflectionNote && (
              <p className="text-stone-600 dark:text-stone-400 italic">
                &ldquo;{session.reflectionNote}&rdquo;
              </p>
            )}

            {session.aiFeedback && (
              <div className="flex items-start gap-1.5 pt-1 text-emerald-800 dark:text-emerald-300 font-serif">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <p>&ldquo;{session.aiFeedback}&rdquo;</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
