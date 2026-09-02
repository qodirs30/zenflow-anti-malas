"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Compass, Edit3, Check, Sparkles } from "lucide-react";

export const IkigaiSection: React.FC = () => {
  const { ikigai, setIkigaiGoal } = useAppState();

  const [isEditing, setIsEditing] = useState(false);
  const [goalInput, setGoalInput] = useState(ikigai.goalTitle);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (goalInput.trim()) {
      setIkigaiGoal(goalInput.trim());
      setIsEditing(false);
    }
  };

  return (
    <section className="w-full zen-glass rounded-3xl p-6 sm:p-10 shadow-zen-card dark:shadow-zen-card-dark relative overflow-hidden transition-all duration-300">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-emerald-700 dark:text-emerald-400 font-sans">
              Prinsip 1: Ikigai (生き甲斐)
            </span>
            <h2 className="text-lg sm:text-xl font-sans font-bold text-stone-900 dark:text-stone-100">
              Tujuan Utama &amp; Alasan Keberadaan Diri
            </h2>
          </div>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-sans font-semibold text-stone-600 dark:text-stone-300 bg-stone-100/80 dark:bg-stone-800/80 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 transition-colors shadow-sm"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Ubah Ikigai</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <label className="block text-xs font-sans text-stone-500 dark:text-stone-400 font-medium">
            Apa karya, karya ilmiah, proyek, atau impian bermakna yang ingin kamu capai?
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              placeholder="Contoh: Membangun startup impian atau menyelesaikan skripsi..."
              className="flex-1 px-4 py-3 text-sm font-sans rounded-2xl border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-950/80 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              autoFocus
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-sans text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Simpan</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          <div className="p-5 rounded-2xl bg-white/60 dark:bg-stone-950/60 border border-stone-200/60 dark:border-stone-800/60 shadow-inner">
            <p className="font-sans text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-snug">
              &ldquo;{ikigai.goalTitle}&rdquo;
            </p>
          </div>
          <p className="text-xs sm:text-sm font-sans text-stone-600 dark:text-stone-400 leading-relaxed">
            Setiap langkah kecil yang fokus adalah bentuk rasa hormat pada waktu dan potensi diri.
          </p>
        </div>
      )}
    </section>
  );
};
