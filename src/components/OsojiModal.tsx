"use client";

import React, { useState, useEffect } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Sparkles, CheckCircle2, Circle, X, ArrowRight, ShieldCheck, Clock } from "lucide-react";

export const OsojiModal: React.FC = () => {
  const {
    activeParentTask,
    activeMicroTask,
    osojiChecklist,
    toggleOsojiItem,
    completeOsojiAndStartFocus,
    cancelFlowBackToDashboard,
  } = useAppState();

  const [prepTimeLeft, setPrepTimeLeft] = useState(120);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrepTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const checkedCount = osojiChecklist.filter((item) => item.checked).length;
  const allChecked = osojiChecklist.every((item) => item.checked);
  const minutes = Math.floor(prepTimeLeft / 60);
  const seconds = prepTimeLeft % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-2xl transition-all animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-9 max-w-lg w-full shadow-2xl relative overflow-hidden">
        {/* Decorative Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-teal-400 to-amber-500" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-sans uppercase tracking-widest font-semibold px-3 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Prinsip 3: Osoji (掃除)
              </span>
              <span className="text-xs font-mono font-semibold text-stone-500 dark:text-stone-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
              Ritual Pembersihan Ruang Kerja
            </h2>
            <p className="text-xs font-sans text-stone-500 dark:text-stone-400 mt-1">
              Persiapkan mental &amp; fisikmu sebelum memasuki Sesi Fokus Ichigo Ichie.
            </p>
          </div>

          <button
            onClick={cancelFlowBackToDashboard}
            className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-xl transition-colors hover:bg-stone-100 dark:hover:bg-stone-800"
            title="Batal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active Target Banner */}
        <div className="p-4 rounded-2xl bg-stone-100/80 dark:bg-stone-950/80 border border-stone-200/80 dark:border-stone-800/80 mb-6">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 block mb-0.5">
            Target Fokus Utama:
          </span>
          <p className="text-sm font-serif font-bold text-emerald-800 dark:text-emerald-300 truncate">
            {activeMicroTask?.title || activeParentTask?.title || "Tugas Utama"}
          </p>
        </div>

        {/* Checklist Progress Bar */}
        <div className="mb-4 space-y-1">
          <div className="flex justify-between text-xs font-sans text-stone-500 dark:text-stone-400 font-medium">
            <span>Kemajuan Ritual Osoji</span>
            <span>{checkedCount} / {osojiChecklist.length} Selesai</span>
          </div>
          <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${(checkedCount / osojiChecklist.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-3 mb-8">
          {osojiChecklist.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleOsojiItem(item.id)}
              className={`w-full flex items-start gap-3.5 p-4 rounded-2xl border text-left transition-all duration-200 ${
                item.checked
                  ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 shadow-sm"
                  : "bg-stone-50/60 dark:bg-stone-950/60 border-stone-200/80 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700"
              }`}
            >
              {item.checked ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-5 h-5 text-stone-400 dark:text-stone-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p
                  className={`text-xs sm:text-sm font-sans font-semibold ${
                    item.checked
                      ? "line-through text-stone-500 dark:text-stone-400"
                      : "text-stone-800 dark:text-stone-200"
                  }`}
                >
                  {item.text}
                </p>
                <p className="text-[11px] font-sans text-stone-500 dark:text-stone-400 mt-0.5">
                  {item.detail}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-200/60 dark:border-stone-800">
          <button
            onClick={cancelFlowBackToDashboard}
            className="text-xs font-sans font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 py-2 px-3 rounded-xl transition-colors"
          >
            Kembali
          </button>

          <button
            onClick={completeOsojiAndStartFocus}
            className={`flex items-center gap-2 text-xs sm:text-sm font-sans font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg ${
              allChecked
                ? "bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/25 active:scale-95"
                : "bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 active:scale-95"
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
