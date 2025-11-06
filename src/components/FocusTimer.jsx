import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function FocusTimer() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => Math.max(0, s - 1));
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    if (seconds === 0 && running) {
      setRunning(false);
      try {
        const audio = new Audio('/chime.mp3');
        audio.play();
      } catch {}
    }
  }, [seconds, running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="rounded-2xl border border-zinc-200/50 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Focus Mode</h3>
        <span className="text-xs text-zinc-500">Pomodoro</span>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center shadow-inner">
          <span className="text-4xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">{mm}:{ss}</span>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black hover:opacity-90"
        >
          {running ? <Pause size={16} /> : <Play size={16} />} {running ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => {
            setSeconds(25 * 60);
            setRunning(false);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200/60 dark:border-white/15 hover:bg-zinc-50/50 dark:hover:bg-white/10"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
}
