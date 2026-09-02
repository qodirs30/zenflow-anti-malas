"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Zap, Plus, Trash2, Play, Sparkles, Clock, CheckCircle } from "lucide-react";

export const KaizenTaskSplitter: React.FC = () => {
  const { tasks, addTask, removeTask, toggleTask, setFlowStage, setCurrentTaskId } = useAppState();

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
        data.microTasks.forEach((micro: { title: string; durationMinutes: number }) => {
          addTask(micro.title, micro.durationMinutes);
        });
      } else {
        addTask(`Langkah 2m: Buka workspace untuk "${title}"`, 2);
        addTask(`Langkah 3m: Tulis draf poin utama "${title}"`, 3);
        addTask(`Langkah 5m: Kerjakan bagian pertama secara fokus`, 5);
      }

      setInputTaskTitle("");
    } catch (err) {
      console.error("Task Breakdown Error:", err);
      addTask(`Langkah 2m: Siapkan bahan untuk "${title}"`, 2);
      addTask(`Langkah 5m: Selesaikan bagian terpenting`, 5);
      setInputTaskTitle("");
    } finally {
      setIsSplitting(false);
    }
  };

  const handleStartFocusSession = (taskId: string) => {
    setCurrentTaskId(taskId);
    setFlowStage("OSOJI_PREP");
  };

  return (
    <section className="w-full zen-glass rounded-3xl p-6 sm:p-10 shadow-zen-card dark:shadow-zen-card-dark relative overflow-hidden transition-all duration-300">
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
                <span>Memecah dengan AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Pecah via Kaizen AI</span>
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
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-stone-300 dark:border-stone-800 rounded-2xl p-6 text-stone-400">
            <p className="text-xs font-sans">Belum ada tugas mikro. Ketik tugas besarmu di atas lalu tekan **Pecah via Kaizen AI**.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                task.completed
                  ? "bg-emerald-500/10 border-emerald-500/20 text-stone-500 dark:text-stone-400"
                  : "bg-white/70 dark:bg-stone-950/70 border-stone-200/70 dark:border-stone-800 text-stone-900 dark:text-stone-100 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                    task.completed
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-stone-400 dark:border-stone-600 hover:border-emerald-600"
                  }`}
                >
                  {task.completed && <CheckCircle className="w-4 h-4" />}
                </button>

                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-sans font-semibold truncate ${task.completed ? "line-through text-stone-400" : ""}`}>
                    {task.title}
                  </p>
                  <span className="text-[11px] font-sans text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>{task.durationMinutes} Menit Micro-Step</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!task.completed && (
                  <button
                    onClick={() => handleStartFocusSession(task.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-sans font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Mulai Fokus</span>
                  </button>
                )}

                <button
                  onClick={() => removeTask(task.id)}
                  className="p-2 text-stone-400 hover:text-red-500 rounded-xl transition-colors"
                  title="Hapus Tugas"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
