"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Compass, Edit3, Check, X, Sparkles } from "lucide-react";

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
    <section className="w-full bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden transition-all duration-300">
      {/* Decorative Wabi-Sabi Circle Background */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 pointer-events-none blur-2xl" />

      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-stone-500 dark:text-stone-400">
              Prinsip 1: Ikigai (生き甲斐)
            </span>
            <h2 className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Tujuan Utama & Motivasi Hidupmu
            </h2>
          </div>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors py-1 px-2.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Ubah</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 text-xs bg-emerald-700 hover:bg-emerald-800 text-white py-1 px-3 rounded-lg transition-colors font-medium shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Simpan</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 py-1 px-2.5 rounded-lg transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Batal</span>
            </button>
          </div>
        )}
      </div>

      {!isEditing ? (
        <div className="mt-2">
          <p className="font-serif text-lg sm:text-xl text-stone-900 dark:text-stone-100 font-medium leading-relaxed">
            &ldquo;{ikigai.goalTitle}&rdquo;
          </p>
          {ikigai.reasoning && (
            <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {ikigai.reasoning}
            </p>
          )}
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
              Pernyataan Tujuan (Ikigai)
            </label>
            <input
              type="text"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              className="w-full text-sm px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              placeholder="Contoh: Menjadi pengembang perangkat lunak berdampak besar..."
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
              Alasan Utama & Refleksi Singkat
            </label>
            <textarea
              rows={2}
              value={reasoning}
              onChange={(e) => setReasoning(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              placeholder="Mengapa tujuan ini begitu penting bagimu?"
            />
          </div>
        </div>
      )}
    </section>
  );
};
