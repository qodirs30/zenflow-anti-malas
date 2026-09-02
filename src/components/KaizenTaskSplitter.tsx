"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Task } from "@/types";
import { Zap, Trash2, Play, Sparkles, Clock, CheckCircle } from "lucide-react";

export const KaizenTaskSplitter: React.FC = () => {
  const { tasks, addTask, deleteTask, selectTaskForFocus, toggleMicroTask } = useAppState();

  const [inputTaskTitle, setInputTaskTitle] = useState("");
  const [isSplitting, setIsSplitting] = useState(false);

  const promptSuggestions = [
    "Selesaikan tugas laporan keuangan",
    "Belajar materi kuis besok",
    "Buat draf artikel blog",
    "Bersihkan & susun meja kerja",
  ];

  const handleCreateKaizenBreakdown = async (titleToUse?: string) => {
    const title = (titleToUse || inputTaskTitle).trim();
    if (!title) return;

    setIsSplitting(true);

    try {
      const res = await fetch("/api/ai/breakdown-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskTitle: title }),
      });
      const data = await res.json();

      if (Array.isArray(data.microTasks) && data.microTasks.length > 0) {
        addTask(title, data.microTasks);
      } else {
        addTask(title, [
          { title: `Buka workspace & siapkan catatan untuk "${title}"`, durationMinutes: 2 },
          { title: `Tuliskan 3 poin outline pertama`, durationMinutes: 3 },
          { title: `Selesaikan draf langkah awal secara fokus`, durationMinutes: 5 },
        ]);
      }

      setInputTaskTitle("");
    } catch (err) {
      console.error("Task Breakdown Error:", err);
      addTask(title, [
        { title: `Buka workspace untuk "${title}"`, durationMinutes: 2 },
        { title: `Kerjakan draf langkah awal secara fokus`, durationMinutes: 5 },
      ]);
      setInputTaskTitle("");
    } finally {
      setIsSplitting(false);
    }
  };

  return (
    <section className="w-full zen-glass rounded-3xl p-6 sm:p-10 shadow-zen-card dark:shadow-zen-card-dark relative overflow-hidden transition-all duration-300 font-sans">
      {/* Title Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-700 dark:text-amber-400 font-sans">
              Prinsip 2: Kaizen (改善) — AI Task Splitter
            </span>
            <h2 className="text-lg sm:text-xl font-sans font-bold text-stone-900 dark:text-stone-100">
              Pecah Tugas Besar Menjadi Langkah Mikro (&lt;5 Menit)
            </h2>
          </div>
        </div>
      </div>

      {/* Input Box */}
      <div className="space-y-3 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <input
            type="text"
            value={inputTaskTitle}
            onChange={(e) => setInputTaskTitle(e.target.value)}
            placeholder="Ketik tugas raksasa yang membuatmu malas atau berat..."
            className="w-full sm:flex-1 px-4 py-3.5 text-sm font-sans rounded-2xl border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-950/80 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateKaizenBreakdown();
            }}
          />
          <button
            onClick={() => handleCreateKaizenBreakdown()}
            disabled={isSplitting || !inputTaskTitle.trim()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-sans text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 shrink-0"
          >
            {isSplitting ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-amber-200" />
                <span>Memecah via Gemini 3.6 AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Pecah via Gemini 3.6 AI</span>
              </>
            )}
          </button>
        </div>

        {/* Prompt Suggestion Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-sans font-medium text-stone-500 dark:text-stone-400">Contoh:</span>
          {promptSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputTaskTitle(suggestion);
                handleCreateKaizenBreakdown(suggestion);
              }}
              className="text-[11px] font-sans px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:border-amber-500/50 hover:text-amber-600 transition-colors"
            >
              + {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-stone-300 dark:border-stone-800 rounded-2xl p-6 text-stone-400">
            <p className="text-xs font-sans">Belum ada tugas mikro. Ketik tugas besarmu di atas lalu tekan **Pecah via Gemini 3.6 AI**.</p>
          </div>
        ) : (
          tasks.map((task: Task) => (
            <div
              key={task.id}
              className="p-5 rounded-2xl border bg-white/70 dark:bg-stone-950/70 border-stone-200/70 dark:border-stone-800 text-stone-900 dark:text-stone-100 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm font-sans font-bold ${task.completed ? "line-through text-stone-400" : ""}`}>
                    {task.title}
                  </h3>
                  <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200/60 font-semibold">
                    {task.microTasks.length} Micro-Steps
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => selectTaskForFocus(task)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-sans font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Mulai Fokus</span>
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 text-stone-400 hover:text-red-500 rounded-xl transition-colors"
                    title="Hapus Tugas"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sub Micro-Tasks List */}
              <div className="space-y-1.5 pt-1 border-t border-stone-200/60 dark:border-stone-800/60">
                {task.microTasks.map((micro) => (
                  <div
                    key={micro.id}
                    className="flex items-center justify-between text-xs py-1 px-2.5 rounded-xl hover:bg-stone-100/60 dark:hover:bg-stone-900/60 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <button
                        onClick={() => toggleMicroTask(task.id, micro.id)}
                        className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                          micro.completed
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "border-stone-400 hover:border-emerald-600"
                        }`}
                      >
                        {micro.completed && <CheckCircle className="w-3 h-3" />}
                      </button>
                      <span className={`font-sans text-xs ${micro.completed ? "line-through text-stone-400" : "text-stone-700 dark:text-stone-300"}`}>
                        {micro.title}
                      </span>
                    </div>

                    <span className="text-[10px] font-sans text-stone-400 shrink-0 flex items-center gap-1 ml-2">
                      <Clock className="w-3 h-3 text-amber-600" />
                      {micro.durationMinutes}m
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
