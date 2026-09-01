"use client";

import React, { useState, useEffect } from "react";
import { useAppState } from "@/context/AppStateContext";
import { AudioPlayer } from "./AudioPlayer";
import { Play, Pause, RotateCcw, CheckSquare, X, Plus, Sparkles, HeartHandshake } from "lucide-react";

export const FocusRoom: React.FC = () => {
  const { activeMicroTask, activeParentTask, finishFocusRoomSession, cancelFlowBackToDashboard, ikigai } = useAppState();

  const TOTAL_SECONDS = 25 * 60; // 25 minutes
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState(true);

  const taskTitle = activeMicroTask?.title || activeParentTask?.title || "Tugas Utama";

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      finishFocusRoomSession();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, finishFocusRoomSession]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TOTAL_SECONDS);
  };

  const addFiveMinutes = () => {
    setTimeLeft((prev) => prev + 300);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = ((TOTAL_SECONDS - timeLeft) / TOTAL_SECONDS) * 100;
  const strokeDashoffset = 565.48 * (1 - progressPercent / 100);

  return (
    <div className="fixed inset-0 z-50 bg-stone-950 text-stone-100 flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden animate-in fade-in duration-500">
      {/* Background Zen Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      {/* Top Header - Minimal & Distraction Free */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-serif text-sm">
            一
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-medium block">
              Prinsip 4: Ichigo Ichie (一期一会)
            </span>
            <span className="text-xs text-stone-400">Satu Momen, Satu Perhatian Murni</span>
          </div>
        </div>

        <button
          onClick={cancelFlowBackToDashboard}
          className="p-2 text-stone-400 hover:text-white hover:bg-stone-900 rounded-full transition-colors"
          title="Keluar dari Ruang Fokus"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Center Circle & Timer Display */}
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center z-10 py-6">
        {/* Active Target Banner */}
        <div className="text-center mb-8 px-4 max-w-md">
          <span className="text-[11px] uppercase tracking-wider font-mono text-emerald-400/80 block mb-1">
            Fokus Mikro Saat Ini
          </span>
          <h2 className="text-lg sm:text-xl font-serif font-medium text-stone-100 leading-snug">
            {taskTitle}
          </h2>
          {ikigai.goalTitle && (
            <p className="text-xs text-stone-400 mt-2 italic opacity-80">
              &ldquo;{ikigai.goalTitle}&rdquo;
            </p>
          )}
        </div>

        {/* Circular Progress Ring Timer */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            {/* Track */}
            <circle
              cx="50%"
              cy="50%"
              r="90"
              className="stroke-stone-900"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Animated Progress Ring */}
            <circle
              cx="50%"
              cy="50%"
              r="90"
              className="stroke-emerald-500 transition-all duration-1000 ease-linear"
              strokeWidth="8"
              strokeDasharray="565.48"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center">
            <span className="font-mono text-5xl sm:text-7xl font-light tracking-tighter text-white">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
            <span className="text-xs text-stone-400 mt-2 font-sans tracking-wide">
              {isRunning ? "Sesi Berjalan..." : "Timer Jeda"}
            </span>
          </div>
        </div>

        {/* Timer Control Bar */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={resetTimer}
            className="p-3 text-stone-400 hover:text-white hover:bg-stone-900 rounded-full transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTimer}
            className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 transition-transform active:scale-95"
            title={isRunning ? "Jeda" : "Mulai"}
          >
            {isRunning ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-0.5" />}
          </button>

          <button
            onClick={addFiveMinutes}
            className="p-3 text-stone-400 hover:text-white hover:bg-stone-900 rounded-full transition-colors flex items-center gap-0.5 text-xs font-mono"
            title="+5 Menit Tambahan"
          >
            <Plus className="w-4 h-4" />
            <span>5m</span>
          </button>
        </div>
      </div>

      {/* Bottom Footer - Audio Soundscapes & Session Completion */}
      <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 z-10 pt-4 border-t border-stone-900">
        <AudioPlayer />

        <button
          onClick={finishFocusRoomSession}
          className="flex items-center gap-2 text-xs sm:text-sm font-medium py-2.5 px-5 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-emerald-400 transition-all hover:scale-105"
        >
          <CheckSquare className="w-4 h-4 text-emerald-400" />
          <span>Selesaikan Sesi &amp; Refleksi AI</span>
        </button>
      </div>
    </div>
  );
};
