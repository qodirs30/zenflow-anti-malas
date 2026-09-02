"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Sparkles, Play, CheckCircle2, Circle, Trash2, ChevronRight, Zap, ListCheck, Layers, ArrowUpRight } from "lucide-react";
import { Task, MicroTask } from "@/types";

const PROMPT_EXAMPLES = [
  "Menulis Draf Artikel Pertamaku",
  "Membuat Desain Slide Presentasi Klien",
  "Merapikan Struktur Kode Projek Next.js",
];

export const KaizenTaskSplitter: React.FC = () => {
  const { tasks, addTask, toggleMicroTask, deleteTask, selectTaskForFocus } = useAppState();
  const [inputTitle, setInputTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateKaizen = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim() || isGenerating) return;

    const currentTitle = inputTitle.trim();
    setIsGenerating(true);

    try {
      const res = await fetch("/api/ai/breakdown-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskTitle: currentTitle }),
      });
      const data = await res.json();
      
      const microTasks = data.microTasks && data.microTasks.length > 0
        ? data.microTasks
        : [
            { title: `Buka workspace & siapkan catatan untuk ${currentTitle}`, durationMinutes: 2 },
            { title: `Tuliskan 3 poin utama awal`, durationMinutes: 3 },
            { title: `Selesaikan draf awal secara instan (5 min)`, durationMinutes: 5 },
          ];

      addTask(currentTitle, microTasks);
      setInputTitle("");
    } catch (err) {
      console.error("Failed to generate task breakdown:", err);
      addTask(currentTitle);
      setInputTitle("");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="w-full space-y-8">
      {/* Kaizen AI Task Input Card */}
      <div className="zen-glass rounded-3xl p-6 sm:p-10 shadow-zen-card dark:shadow-zen-card-dark relative overflow-hidden transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <Zap className="w-5 h-5 fill-amber-500/20" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-700 dark:text-amber-400 font-sans">
              Prinsip 2: Kaizen (改善) — AI Micro-Steps
            </span>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Pecah Tugas Berat Menjadi Langkah Mikro (&lt; 5 Menit)
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm font-sans text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
          Penyebab utama penundaan adalah ukuran tugas yang terlampau besar. Masukkan tugas besarmu, dan <strong>Gemini AI 3.6 Flash</strong> akan otomatis memecahnya menjadi aksi mikro super mudah.
        </p>

        <form onSubmit={handleGenerateKaizen} className="space-y-4">
          <div className="relative flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              disabled={isGenerating}
              placeholder="Masukkan tugas yang terasa menakutkan..."
              className="flex-1 px-5 py-3.5 text-sm font-sans rounded-2xl border border-stone-300 dark:border-stone-700 bg-white/90 dark:bg-stone-950/90 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 transition-all shadow-inner"
            />

            <button
              type="submit"
              disabled={!inputTitle.trim() || isGenerating}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-800 hover:to-emerald-700 disabled:opacity-40 text-white text-sm font-medium py-3.5 px-7 rounded-2xl transition-all shadow-lg shadow-emerald-700/20 disabled:cursor-not-allowed whitespace-nowrap active:scale-98"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Memecah dengan Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Pecah Tugas (Kaizen)</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Prompt Suggestion Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-sans text-stone-500 dark:text-stone-400 font-medium">Contoh:</span>
            {PROMPT_EXAMPLES.map((example, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputTitle(example)}
                className="text-[11px] font-sans text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-300 bg-stone-100/80 dark:bg-stone-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 px-3 py-1 rounded-full transition-colors border border-stone-200/60 dark:border-stone-800"
              >
                {example}
              </button>
            ))}
          </div>
        </form>

        {/* Minimalist Glowing Skeleton Loader */}
        {isGenerating && (
          <div className="mt-6 p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/30 space-y-3 animate-pulse">
            <div className="flex items-center gap-2 text-xs font-sans text-emerald-800 dark:text-emerald-300 font-semibold">
              <Sparkles className="w-4 h-4 animate-spin text-emerald-600" />
              <span>Gemini 3.6 Flash sedang membedah tugas ke dalam aksi mikro...</span>
            </div>
            <div className="h-4 bg-emerald-300/30 dark:bg-emerald-800/30 rounded-xl w-3/4" />
            <div className="h-4 bg-emerald-300/30 dark:bg-emerald-800/30 rounded-xl w-1/2" />
            <div className="h-4 bg-emerald-300/30 dark:bg-emerald-800/30 rounded-xl w-2/3" />
          </div>
        )}
      </div>

      {/* Active Tasks & Micro-steps Ledger */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2.5">
            <ListCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-500" />
            <span>Daftar Tugas &amp; Micro-Steps Aktif ({tasks.length})</span>
          </h3>
        </div>

        {tasks.length === 0 ? (
          <div className="p-10 text-center border-2 border-dashed border-stone-300 dark:border-stone-800 rounded-3xl bg-white/40 dark:bg-stone-900/40">
            <Layers className="w-8 h-8 mx-auto text-stone-400 dark:text-stone-600 mb-2" />
            <p className="text-xs font-sans text-stone-500 dark:text-stone-400">
              Belum ada tugas. Masukkan tugas di atas untuk merasakan kemudahan filosofi Kaizen.
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`zen-glass rounded-3xl p-6 shadow-sm space-y-4 transition-all duration-300 ${
                task.completed ? "opacity-75" : ""
              }`}
            >
              {/* Task Title Bar */}
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h4 className={`text-base font-serif font-bold ${
                    task.completed ? "line-through text-stone-400" : "text-stone-900 dark:text-stone-50"
                  } truncate`}>
                    {task.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => selectTaskForFocus(task)}
                    className="flex items-center gap-1.5 text-xs font-sans font-semibold bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 py-2 px-4 rounded-xl transition-all shadow-md active:scale-95"
                    title="Mulai Sesi Fokus Ichigo Ichie"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Fokus (25m)</span>
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-stone-400 hover:text-red-500 transition-colors rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Hapus Tugas"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Micro-Tasks Items */}
              {task.microTasks && task.microTasks.length > 0 && (
                <div className="pt-3 border-t border-stone-200/60 dark:border-stone-800/80 space-y-2.5">
                  {task.microTasks.map((micro) => (
                    <div
                      key={micro.id}
                      className="flex items-center justify-between p-3 rounded-2xl bg-stone-100/60 dark:bg-stone-950/60 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-all border border-stone-200/40 dark:border-stone-800/40 group"
                    >
                      <button
                        onClick={() => toggleMicroTask(task.id, micro.id)}
                        className="flex items-center gap-3 text-left min-w-0 flex-1"
                      >
                        {micro.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-stone-400 dark:text-stone-600 shrink-0 group-hover:text-emerald-600 transition-colors" />
                        )}
                        <span
                          className={`text-xs sm:text-sm font-sans ${
                            micro.completed
                              ? "line-through text-stone-400 dark:text-stone-500"
                              : "text-stone-800 dark:text-stone-200 font-medium"
                          } truncate`}
                        >
                          {micro.title}
                        </span>
                      </button>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[11px] font-mono text-stone-600 dark:text-stone-400 bg-stone-200/80 dark:bg-stone-800 px-2.5 py-0.5 rounded-lg">
                          {micro.durationMinutes}m
                        </span>
                        <button
                          onClick={() => selectTaskForFocus(task, micro)}
                          className="text-xs font-sans text-emerald-700 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-0.5"
                        >
                          <span>Fokus</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};
