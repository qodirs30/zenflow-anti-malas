"use client";

import React, { useState, useEffect } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Sparkles, CheckCircle2, Circle, X, ArrowRight, ShieldCheck } from "lucide-react";

export const OsojiModal: React.FC = () => {
  const {
    activeParentTask,
    activeMicroTask,
    osojiChecklist,
    toggleOsojiItem,
    completeOsojiAndStartFocus,
    cancelFlowBackToDashboard,
  } = useAppState();

  // 2-minute (120 sec) optional countdown timer for prep
  const [prepTimeLeft, setPrepTimeLeft] = useState(120);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrepTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const allChecked = osojiChecklist.every((item) => item.checked);
  const minutes = Math.floor(prepTimeLeft / 60);
  const seconds = prepTimeLeft % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md transition-all animate-in fade-in duration-300">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden">
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-500" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Prinsip 3: Osoji (掃除)
              </span>
              <span className="text-xs font-mono font-medium text-stone-500 dark:text-stone-400">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-medium text-stone-900 dark:text-stone-100">
              Ritual Pembersihan Ruang Kerja
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Persiapkan mental &amp; fisikmu sebelum memasuki Sesi Fokus Ichigo Ichie.
            </p>
          </div>

          <button
            onClick={cancelFlowBackToDashboard}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg transition-colors"
            title="Batal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Task Target */}
        <div className="p-3.5 rounded-xl bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 mb-6">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 block mb-0.5">
            Target Fokus Utama:
          </span>
          <p className="text-xs sm:text-sm font-medium text-emerald-800 dark:text-emerald-300 truncate">
            {activeMicroTask?.title || activeParentTask?.title || "Tugas Utama"}
          </p>
        </div>

        {/* Checklist */}
        <div className="space-y-3 mb-8">
          {osojiChecklist.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleOsojiItem(item.id)}
              className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                item.checked
                  ? "bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-300/80 dark:border-emerald-800"
                  : "bg-stone-50 dark:bg-stone-950/60 border-stone-200 dark:border-stone-800 hover:border-stone-300"
              }`}
            >
              {item.checked ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-5 h-5 text-stone-400 dark:text-stone-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p
                  className={`text-xs sm:text-sm font-medium ${
                    item.checked
                      ? "line-through text-stone-500 dark:text-stone-400"
                      : "text-stone-800 dark:text-stone-200"
                  }`}
                >
                  {item.text}
                </p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                  {item.detail}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={cancelFlowBackToDashboard}
            className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 font-medium py-2 px-3 rounded-lg transition-colors"
          >
            Kembali ke Dashboard
          </button>

          <button
            onClick={completeOsojiAndStartFocus}
            className={`flex items-center gap-2 text-xs sm:text-sm font-medium py-3 px-6 rounded-xl transition-all shadow-md ${
              allChecked
                ? "bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20"
                : "bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900"
            }`}
          >
            <span>{allChecked ? "Masuk Ruang Fokus Sekarang" : "Lewati &amp; Mulai Fokus"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
