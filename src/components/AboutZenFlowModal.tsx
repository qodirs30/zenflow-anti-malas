"use client";

import React from "react";
import { X, Compass, Zap, ShieldCheck, HeartHandshake, Sparkles, Flower2 } from "lucide-react";

interface AboutZenFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutZenFlowModal: React.FC<AboutZenFlowModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-2xl transition-all animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-9 max-w-2xl w-full shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto font-sans">
        {/* Top Decorative Rim */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-teal-400 to-amber-500" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-950 flex items-center justify-center font-japanese text-2xl shadow-md">
              禅
            </div>
            <div>
              <span className="text-[11px] font-sans uppercase tracking-widest font-semibold text-emerald-700 dark:text-emerald-400">
                Tentang &amp; Filosofi Aplikasi
              </span>
              <h2 className="text-xl sm:text-2xl font-sans font-bold text-stone-900 dark:text-stone-50">
                ZenFlow (生き甲斐 &amp; 改善)
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-xl transition-colors hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Introduction */}
        <p className="text-xs sm:text-sm font-sans text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
          <strong>ZenFlow</strong> adalah aplikasi produktivitas berbasis psikologi dan filosofi Jepang yang dirancang khusus untuk <strong>mengeliminasi rasa malas, kecemasan, dan penundaan (*procrastination*)</strong> tanpa rasa tertekan.
        </p>

        {/* 4 Core Philosophies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* 1. Ikigai */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/70 border border-stone-200/70 dark:border-stone-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>1. Ikigai (生き甲斐) — Purpose</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
              Menghubungkan setiap tugas harian dengan alasan keberadaan dan tujuan hidup utamamu agar motivasi berasal dari dalam diri (*intrinsic motivation*).
            </p>
          </div>

          {/* 2. Kaizen */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/70 border border-stone-200/70 dark:border-stone-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>2. Kaizen (改善) — Micro-Steps</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
              Ditenagai **Gemini AI 1.5** untuk memecah tugas raksasa yang menakutkan menjadi aksi mikro mudah di bawah 5 menit untuk menghilangkan hambatan mental.
            </p>
          </div>

          {/* 3. Osoji */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/70 border border-stone-200/70 dark:border-stone-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 dark:text-teal-400">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>3. Osoji (掃除) — Workspace Prep</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
              Ritual pembersihan ruang kerja 2 menit sebelum mulai bekerja untuk menjernihkan pikiran dari distraksi fisik dan digital.
            </p>
          </div>

          {/* 4. Ichigo Ichie */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/70 border border-stone-200/70 dark:border-stone-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <Flower2 className="w-4 h-4 text-emerald-500" />
              <span>4. Ichigo Ichie (一期一会) — Pure Focus</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
              Menghargai satu momen tunggal dalam Ruang Fokus Pomodoro 25 menit yang dilengkapi musik ambient alami (*Rain, Water, Wind, Temple Bell*).
            </p>
          </div>
        </div>

        {/* AI Features Summary */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-950 dark:text-emerald-200 space-y-2 mb-6 font-sans">
          <div className="flex items-center gap-2 font-semibold text-emerald-800 dark:text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Kecerdasan AI yang Terintegrasi</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-emerald-900/90 dark:text-emerald-200/90 leading-relaxed">
            <li><strong>Kaizen Task Splitter</strong>: Gemini 1.5 Flash memecah tugas rumit secara otomatis.</li>
            <li><strong>Post-Session Reflection</strong>: Gemini 1.5 Flash menganalisis refleksi harianmu.</li>
            <li><strong>Sensei Zen AI Chatbot</strong>: Konsultasi interaktif untuk mengatasi hambatan mental &amp; manajemen stres.</li>
            <li><strong>AI Task Analytics</strong>: Analisis performa &amp; saran produktivitas personal.</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-right font-sans">
          <button
            onClick={onClose}
            className="bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md active:scale-95"
          >
            Mengerti &amp; Mulai Ketenangan
          </button>
        </div>
      </div>
    </div>
  );
};
