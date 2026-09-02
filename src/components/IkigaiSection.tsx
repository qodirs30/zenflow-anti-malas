"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Compass, Edit3, Check, X, Sparkles, Heart } from "lucide-react";

export const IkigaiSection: React.FC = () => {
  const { ikigai, setIkigai } = useAppState();
  const [isEditing, setIsEditing] = useState(false);
  const [goalTitle, setGoalTitle] = useState(ikigai.goalTitle);
  const [reasoning, setReasoning] = useState(ikigai.reasoning);

  const handleSave = () => {
    if (goalTitle.trim()) {
      setIkigai({
        goalTitle: goalTitle.trim(),
        reasoning: reasoning.trim(),
        updatedAt: new Date().toISOString(),
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setGoalTitle(ikigai.goalTitle);
    setReasoning(ikigai.reasoning);
    setIsEditing(false);
  };

  return (
    <section className="w-full zen-glass rounded-3xl p-6 sm:p-10 shadow-zen-card dark:shadow-zen-card-dark relative overflow-hidden transition-all duration-300 zen-glow-border">
      {/* Background Decorative Zen Glow Folds */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Row */}
      <div className="flex items-center justify-between gap-4 mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-emerald-700 dark:text-emerald-400 font-sans">
                Prinsip 1: Ikigai (生き甲斐)
              </span>
            </div>
            <h2 className="text-sm font-sans font-medium text-stone-600 dark:text-stone-400">
              Tujuan Utama &amp; Alasan Keberadaan Diri
            </h2>
          </div>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 text-xs font-sans font-medium text-stone-500 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors py-1.5 px-3 rounded-xl hover:bg-stone-100/80 dark:hover:bg-stone-800/80 border border-stone-200/50 dark:border-stone-800/50"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Ubah</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-1.5 px-3.5 rounded-xl transition-all shadow-md"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Simpan</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 py-1.5 px-3 rounded-xl transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Batal</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Quote Content */}
      {!isEditing ? (
        <div className="relative z-10 mt-4 pt-2">
          <p className="font-serif text-2xl sm:text-3xl text-stone-900 dark:text-stone-50 font-bold leading-tight tracking-tight italic">
            &ldquo;{ikigai.goalTitle}&rdquo;
          </p>
          {ikigai.reasoning && (
            <p className="mt-3 text-xs sm:text-sm font-sans text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
              {ikigai.reasoning}
            </p>
          )}
        </div>
      ) : (
        <div className="relative z-10 mt-4 space-y-4">
          <div>
            <label className="block text-xs font-sans font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
              Pernyataan Tujuan Ikigai Utama:
            </label>
            <input
              type="text"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              className="w-full text-sm font-sans px-4 py-2.5 rounded-2xl border border-stone-300 dark:border-stone-700 bg-white/90 dark:bg-stone-950/90 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-inner"
              placeholder="Contoh: Membangun produk teknologi berdampak sosial dengan fokus tenang..."
            />
          </div>
          <div>
            <label className="block text-xs font-sans font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
              Alasan Terpenuhinya Nilai Diri:
            </label>
            <textarea
              rows={2}
              value={reasoning}
              onChange={(e) => setReasoning(e.target.value)}
              className="w-full text-xs sm:text-sm font-sans px-4 py-2.5 rounded-2xl border border-stone-300 dark:border-stone-700 bg-white/90 dark:bg-stone-950/90 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-inner"
              placeholder="Mengapa tujuan ini memberi arti dalam hidupmu?"
            />
          </div>
        </div>
      )}
    </section>
  );
};
