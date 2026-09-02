"use client";

import React, { useState, useEffect } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Sparkles, TrendingUp, Award, RefreshCw, CheckCircle, Compass, Zap } from "lucide-react";

interface AnalyticsData {
  headline: string;
  summary: string;
  strengths: string[];
  recommendations: string[];
  efficiencyScore: number;
}

export const AiAnalyticsSection: React.FC = () => {
  const { focusSessions, tasks, ikigai } = useAppState();

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const totalFocusMinutes = focusSessions.length * 25;

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/ai/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionsCount: focusSessions.length,
          completedTasksCount,
          totalFocusMinutes,
          ikigaiPurpose: ikigai.goalTitle,
          recentTasks: tasks.slice(0, 5).map((t) => ({ title: t.title, completed: t.completed })),
        }),
      });
      const data = await res.json();
      if (data.analytics) {
        setAnalytics(data.analytics);
      }
    } catch (err) {
      console.error("Failed to fetch AI analytics:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-deps
  }, [focusSessions.length, completedTasksCount]);

  return (
    <section className="w-full zen-glass rounded-3xl p-6 sm:p-10 shadow-zen-card dark:shadow-zen-card-dark relative overflow-hidden transition-all duration-300">
      {/* Background Decorative Ambient Gradient */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Title Bar */}
      <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-emerald-700 dark:text-emerald-400 font-sans">
              Analisa AI Keseluruhan Tugas &amp; Produktivitas
            </span>
            <h2 className="text-lg sm:text-xl font-sans font-bold text-stone-900 dark:text-stone-100">
              Evaluasi Kaizen &amp; Saran Pengembangan Diri
            </h2>
          </div>
        </div>

        <button
          onClick={fetchAnalytics}
          disabled={isLoading}
          className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors disabled:opacity-50"
          title="Perbarui Analisa AI"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-emerald-600" : ""}`} />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 relative z-10">
        <div className="p-4 rounded-2xl bg-white/70 dark:bg-stone-950/70 border border-stone-200/70 dark:border-stone-800 text-center">
          <span className="text-[10px] sm:text-xs font-sans uppercase font-semibold text-stone-500 dark:text-stone-400 block mb-1">
            Total Sesi Fokus
          </span>
          <span className="font-sans text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">
            {focusSessions.length}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 dark:bg-stone-950/70 border border-stone-200/70 dark:border-stone-800 text-center">
          <span className="text-[10px] sm:text-xs font-sans uppercase font-semibold text-stone-500 dark:text-stone-400 block mb-1">
            Waktu Murni Fokus
          </span>
          <span className="font-sans text-2xl sm:text-3xl font-extrabold text-amber-700 dark:text-amber-400">
            {totalFocusMinutes}m
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 dark:bg-stone-950/70 border border-stone-200/70 dark:border-stone-800 text-center">
          <span className="text-[10px] sm:text-xs font-sans uppercase font-semibold text-stone-500 dark:text-stone-400 block mb-1">
            Skor Efisiensi AI
          </span>
          <span className="font-sans text-2xl sm:text-3xl font-extrabold text-teal-700 dark:text-teal-400">
            {analytics?.efficiencyScore || 88}%
          </span>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-3 animate-pulse">
          <div className="h-5 bg-emerald-300/30 dark:bg-emerald-800/30 rounded-xl w-3/4" />
          <div className="h-4 bg-emerald-300/30 dark:bg-emerald-800/30 rounded-xl w-full" />
          <div className="h-4 bg-emerald-300/30 dark:bg-emerald-800/30 rounded-xl w-2/3" />
        </div>
      )}

      {/* Analytics Content */}
      {analytics && !isLoading && (
        <div className="space-y-6 relative z-10">
          {/* AI Headline Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-amber-500/10 border border-emerald-500/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Ringkasan Rangkuman AI Gemini 1.5</span>
            </div>
            <p className="font-sans text-base sm:text-lg font-bold text-stone-900 dark:text-stone-50">
              &ldquo;{analytics.headline}&rdquo;
            </p>
            <p className="text-xs sm:text-sm font-sans text-stone-600 dark:text-stone-300 leading-relaxed">
              {analytics.summary}
            </p>
          </div>

          {/* Strengths & Recommendations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-5 rounded-2xl bg-white/70 dark:bg-stone-950/70 border border-stone-200/70 dark:border-stone-800 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                <span>Kekuatan Habit yang Terbentuk</span>
              </div>
              <ul className="space-y-1.5 text-xs font-sans text-stone-700 dark:text-stone-300">
                {analytics.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 shrink-0 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="p-5 rounded-2xl bg-white/70 dark:bg-stone-950/70 border border-stone-200/70 dark:border-stone-800 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
                <Zap className="w-4 h-4" />
                <span>Saran Kaizen untuk Esok Hari</span>
              </div>
              <ul className="space-y-1.5 text-xs font-sans text-stone-700 dark:text-stone-300">
                {analytics.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 shrink-0 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
