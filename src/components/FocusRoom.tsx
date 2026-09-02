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
    <div className="fixed inset-0 z-50 bg-[#0A0A0B] text-stone-100 flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden animate-in fade-in duration-500 font-sans">
      {/* Background Zen Glow Folds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />

      {/* Top Header Bar */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-japanese text-base shadow-lg">
            一
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-semibold block">
              Prinsip 4: Ichigo Ichie (一期一会)
            </span>
            <span className="text-xs text-stone-400">Satu Momen, Satu Perhatian Murni</span>
          </div>
        </div>

        <button
          onClick={cancelFlowBackToDashboard}
          className="p-2.5 text-stone-400 hover:text-white hover:bg-stone-900/80 rounded-2xl transition-colors border border-stone-800"
          title="Keluar dari Ruang Fokus"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Center Circle & Countdown Display */}
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center z-10 py-6">
        {/* Active Target Banner */}
        <div className="text-center mb-8 px-4 max-w-md">
          <span className="text-[11px] uppercase tracking-widest font-semibold text-emerald-400/90 block mb-1">
            Fokus Mikro Saat Ini
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-50 leading-snug">
            {taskTitle}
          </h2>
          {ikigai.goalTitle && (
            <p className="text-xs text-stone-400 mt-2 italic font-serif opacity-85">
              &ldquo;{ikigai.goalTitle}&rdquo;
            </p>
          )}
        </div>

        {/* Circular Progress Ring Timer */}
        <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            {/* Track */}
            <circle
              cx="50%"
              cy="50%"
              r="100"
              className="stroke-stone-900"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Animated Progress Ring */}
            <circle
              cx="50%"
              cy="50%"
              r="100"
              className="stroke-emerald-500 transition-all duration-1000 ease-linear shadow-lg"
              strokeWidth="6"
              strokeDasharray="628.3"
              strokeDashoffset={628.3 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center">
            <span className="font-serif text-6xl sm:text-7xl font-bold tracking-tighter text-white">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
            <span className="text-xs text-stone-400 mt-2 font-sans tracking-widest uppercase font-semibold">
              {isRunning ? "Sesi Berjalan" : "Timer Di-Jeda"}
            </span>
          </div>
        </div>

        {/* Timer Controls */}
        <div className="flex items-center gap-5 mt-10">
          <button
            onClick={resetTimer}
            className="p-3.5 text-stone-400 hover:text-white hover:bg-stone-900/80 rounded-2xl transition-colors border border-stone-800"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTimer}
            className="w-16 h-16 rounded-3xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white flex items-center justify-center shadow-xl shadow-emerald-600/30 transition-transform active:scale-95"
            title={isRunning ? "Jeda" : "Mulai"}
          >
            {isRunning ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
          </button>

          <button
            onClick={addFiveMinutes}
            className="p-3.5 text-stone-400 hover:text-white hover:bg-stone-900/80 rounded-2xl transition-colors border border-stone-800 flex items-center gap-1 text-xs font-mono font-semibold"
            title="+5 Menit Tambahan"
          >
            <Plus className="w-4 h-4" />
            <span>5m</span>
          </button>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 z-10 pt-4 border-t border-stone-900">
        <AudioPlayer />

        <button
          onClick={finishFocusRoomSession}
          className="flex items-center gap-2 text-xs sm:text-sm font-sans font-bold py-3 px-6 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-800/80 text-emerald-300 transition-all shadow-md active:scale-95"
        >
          <CheckSquare className="w-4 h-4 text-emerald-400" />
          <span>Selesaikan Sesi &amp; Refleksi AI</span>
        </button>
      </div>
    </div>
  );
};
