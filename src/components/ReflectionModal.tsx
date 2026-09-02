"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import confetti from "canvas-confetti";
import { Sparkles, ArrowRight, Heart, Compass, CheckCircle2 } from "lucide-react";

export const ReflectionModal: React.FC = () => {
  const {
    activeMicroTask,
    activeParentTask,
    ikigai,
    submitReflectionAndFinish,
    cancelFlowBackToDashboard,
  } = useAppState();

  const [userNote, setUserNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  const taskTitle = activeMicroTask?.title || activeParentTask?.title || "Sesi Fokus";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const feedback = await submitReflectionAndFinish(userNote.trim());
      setAiFeedback(feedback);

      // Trigger subtle serene celebration confetti
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10b981", "#059669", "#d97706", "#f59e0b"],
      });
    } catch (err) {
      console.error("Reflection submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-2xl transition-all animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-9 max-w-lg w-full shadow-2xl relative overflow-hidden">
        {/* Top Decorative Banner */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500" />

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-sans font-semibold mb-2 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Sesi Fokus 25 Menit Selesai!</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
            Refleksi Pascafokus &amp; Umpan Balik AI
          </h2>
          <p className="text-xs font-sans text-stone-500 dark:text-stone-400 mt-1">
            &ldquo;{taskTitle}&rdquo;
          </p>
        </div>

        {!aiFeedback ? (
          <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            <div>
              <label className="block text-xs font-sans font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Tuliskan 1 kalimat refleksi atau hal yang berhasil kamu pelajari:
              </label>
              <textarea
                rows={3}
                required
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="Contoh: Saya berhasil menyelesaikan poin outline pertama tanpa terdistraksi..."
                className="w-full text-xs sm:text-sm font-sans px-4 py-3 rounded-2xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-inner"
              />
            </div>

            {ikigai.goalTitle && (
              <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 text-xs font-sans text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
                <Compass className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span>
                  <strong>Gemini 3.7 Flash</strong> akan menghubungkan refleksi ini dengan tujuan Ikigaimu: <em>&ldquo;{ikigai.goalTitle}&rdquo;</em>.
                </span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={cancelFlowBackToDashboard}
                className="text-xs font-sans font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 py-2 px-3.5 rounded-xl"
              >
                Lewati
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !userNote.trim()}
                className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs sm:text-sm font-sans font-semibold py-3 px-5 rounded-2xl transition-all shadow-md active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Menganalisis Refleksi (Gemini 3.7)...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>Kirim &amp; Dapatkan Pesan Zen</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 font-sans">
            {/* AI Feedback Quote Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/60 dark:to-teal-950/60 border border-emerald-300/80 dark:border-emerald-800/80 shadow-md space-y-3 relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Pesan Motivasi Ikigai dari Gemini AI</span>
              </div>
              <p className="font-serif text-base sm:text-lg text-emerald-950 dark:text-emerald-100 italic leading-relaxed font-bold">
                &ldquo;{aiFeedback}&rdquo;
              </p>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={cancelFlowBackToDashboard}
                className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-sm font-sans font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg active:scale-95"
              >
                <span>Kembali ke Dashboard (Koleksi Momen)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
