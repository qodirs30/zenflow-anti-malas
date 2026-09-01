"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Sparkles, Play, CheckCircle2, Circle, Trash2, ChevronRight, Zap, ListCheck } from "lucide-react";
import { Task, MicroTask } from "@/types";

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
            { title: `Buka workspace & kumpulkan bahan untuk ${currentTitle}`, durationMinutes: 2 },
            { title: `Tuliskan 3 poin utama awal`, durationMinutes: 3 },
            { title: `Selesaikan draf awal secara instan (5 min)`, durationMinutes: 5 },
          ];

      addTask(currentTitle, microTasks);
      setInputTitle("");
    } catch (err) {
      console.error("Failed to generate task breakdown:", err);
      // Fallback
      addTask(currentTitle);
      setInputTitle("");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="w-full space-y-6">
      {/* Kaizen AI Input Card */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-stone-500 dark:text-stone-400">
              Prinsip 2: Kaizen (改善) - Micro-steps
            </span>
            <h2 className="text-base font-medium text-stone-900 dark:text-stone-100">
              Ubah Tugas Berat Menjadi Langkah-Langkah Mikro (&lt; 5 Menit)
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mb-5 leading-relaxed">
          Penyebab utama penundaan adalah ukuran tugas yang menakutkan. Masukkan tugas besarmu, dan Gemini AI 3.6 Flash akan otomatis memecahnya menjadi aksi mikro super mudah.
        </p>

        <form onSubmit={handleGenerateKaizen} className="relative flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            disabled={isGenerating}
            placeholder="Contoh: Menyiapkan Presentasi Proposal Klien..."
            className="flex-1 px-4 py-3 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 transition-all"
          />

          <button
            type="submit"
            disabled={!inputTitle.trim() || isGenerating}
            className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-300 dark:disabled:bg-stone-800 text-white text-sm font-medium py-3 px-6 rounded-xl transition-all shadow-sm disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Memecah dengan Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Pecah Tugas (Kaizen)</span>
              </>
            )}
          </button>
        </form>

        {/* Subtle Skeleton Loader for AI generation as required by style.md */}
        {isGenerating && (
          <div className="mt-6 p-4 rounded-xl border border-emerald-200/50 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-3 animate-pulse">
            <div className="flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-400 font-medium">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Gemini 3.6 Flash sedang menganalisis & menyusun micro-step...</span>
            </div>
            <div className="h-4 bg-emerald-200/60 dark:bg-emerald-900/40 rounded w-3/4" />
            <div className="h-4 bg-emerald-200/60 dark:bg-emerald-900/40 rounded w-1/2" />
            <div className="h-4 bg-emerald-200/60 dark:bg-emerald-900/40 rounded w-2/3" />
          </div>
        )}
      </div>

      {/* Tasks & Micro-Tasks List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-serif font-medium text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <ListCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-500" />
            <span>Daftar Tugas &amp; Micro-Steps Aktif ({tasks.length})</span>
          </h3>
        </div>

        {tasks.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-stone-300 dark:border-stone-800 rounded-2xl bg-white/50 dark:bg-stone-900/50">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Belum ada tugas. Masukkan tugas di atas untuk memulai filosofi Kaizen.
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white dark:bg-stone-900 border ${
                task.completed
                  ? "border-stone-200 dark:border-stone-800 opacity-70"
                  : "border-stone-200/90 dark:border-stone-800"
              } rounded-2xl p-5 shadow-sm space-y-3 transition-all`}
            >
              {/* Task Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <h4 className={`text-sm font-medium ${task.completed ? "line-through text-stone-400" : "text-stone-900 dark:text-stone-100"} truncate`}>
                    {task.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => selectTaskForFocus(task)}
                    className="flex items-center gap-1.5 text-xs bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-medium py-1.5 px-3.5 rounded-xl transition-all shadow-sm"
                    title="Mulai Sesi Fokus Ichigo Ichie"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Mulai Fokus (25m)</span>
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 text-stone-400 hover:text-red-500 transition-colors rounded-lg"
                    title="Hapus Tugas"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Micro-Tasks Breakdown List */}
              {task.microTasks && task.microTasks.length > 0 && (
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 space-y-2">
                  {task.microTasks.map((micro) => (
                    <div
                      key={micro.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50/80 dark:bg-stone-950/60 hover:bg-stone-100/80 dark:hover:bg-stone-800/60 transition-colors group"
                    >
                      <button
                        onClick={() => toggleMicroTask(task.id, micro.id)}
                        className="flex items-center gap-2.5 text-left text-xs min-w-0 flex-1"
                      >
                        {micro.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-stone-400 dark:text-stone-600 shrink-0 group-hover:text-emerald-600" />
                        )}
                        <span
                          className={`${
                            micro.completed
                              ? "line-through text-stone-400 dark:text-stone-500"
                              : "text-stone-700 dark:text-stone-300"
                          } truncate`}
                        >
                          {micro.title}
                        </span>
                      </button>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-mono text-stone-600 dark:text-stone-400 bg-stone-200/50 dark:bg-stone-800 px-2 py-0.5 rounded-md">
                          {micro.durationMinutes}m
                        </span>
                        <button
                          onClick={() => selectTaskForFocus(task, micro)}
                          className="text-[11px] text-emerald-800 dark:text-emerald-400 hover:underline font-medium flex items-center gap-0.5"
                        >
                          <span>Fokus</span>
                          <ChevronRight className="w-3 h-3" />
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
