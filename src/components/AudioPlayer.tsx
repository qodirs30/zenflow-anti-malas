"use client";

import React, { useState, useEffect } from "react";
import { zenAudio } from "@/lib/audio";
import { Volume2, VolumeX, CloudRain, Waves, Wind, Bell } from "lucide-react";

export const AudioPlayer: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<'rain' | 'bamboo' | 'wind' | 'bell' | 'none'>('rain');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Auto-start rain soundscape gently when Focus Room opens
    zenAudio.playTrack('rain');
    setIsPlaying(true);

    return () => {
      zenAudio.stopAll();
    };
  }, []);

  const handleSelectTrack = (trackId: 'rain' | 'bamboo' | 'wind' | 'bell' | 'none') => {
    if (trackId === activeTrack && isPlaying) {
      zenAudio.stopAll();
      setIsPlaying(false);
      setActiveTrack('none');
    } else {
      zenAudio.playTrack(trackId);
      setIsPlaying(true);
      setActiveTrack(trackId);
    }
  };

  const handleToggleMute = () => {
    if (isPlaying) {
      zenAudio.stopAll();
      setIsPlaying(false);
    } else {
      const nextTrack = activeTrack === 'none' ? 'rain' : activeTrack;
      zenAudio.playTrack(nextTrack);
      setIsPlaying(true);
      setActiveTrack(nextTrack);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-2xl bg-stone-900/60 dark:bg-stone-950/80 backdrop-blur-md border border-stone-800/80 text-stone-200">
      {/* Sound Options */}
      <button
        onClick={() => handleSelectTrack('rain')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
          activeTrack === 'rain' && isPlaying
            ? 'bg-emerald-600/90 text-white shadow-sm'
            : 'hover:bg-stone-800 text-stone-400'
        }`}
        title="Suara Hujan (Rain)"
      >
        <CloudRain className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Hujan</span>
      </button>

      <button
        onClick={() => handleSelectTrack('bamboo')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
          activeTrack === 'bamboo' && isPlaying
            ? 'bg-emerald-600/90 text-white shadow-sm'
            : 'hover:bg-stone-800 text-stone-400'
        }`}
        title="Air Bambu Shishi-odoshi"
      >
        <Waves className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Air Bambu</span>
      </button>

      <button
        onClick={() => handleSelectTrack('wind')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
          activeTrack === 'wind' && isPlaying
            ? 'bg-emerald-600/90 text-white shadow-sm'
            : 'hover:bg-stone-800 text-stone-400'
        }`}
        title="Angin Taman Zen"
      >
        <Wind className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Angin Zen</span>
      </button>

      <button
        onClick={() => zenAudio.playTempleBell()}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-400 hover:bg-stone-800 transition-all"
        title="Bunyikan Lonceng Kuil (Singing Bowl)"
      >
        <Bell className="w-3.5 h-3.5 text-amber-400" />
        <span className="hidden sm:inline">Lonceng</span>
      </button>

      {/* Mute / Unmute */}
      <button
        onClick={handleToggleMute}
        className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors ml-1"
        title={isPlaying ? "Mute Ambient Sound" : "Unmute Ambient Sound"}
      >
        {isPlaying ? <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
      </button>
    </div>
  );
};
