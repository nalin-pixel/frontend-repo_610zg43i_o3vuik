import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';

const INITIAL_SECONDS = 25 * 60; // 25 minutes

export default function FocusTimer() {
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(() => {});
            }
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');

  return (
    <div className="rounded-2xl border border-slate-200/10 bg-white/5 backdrop-blur p-5 flex flex-col items-center">
      <h3 className="text-white font-semibold mb-4">Focus Mode</h3>
      <div className="text-white text-5xl font-medium tracking-tight tabular-nums">{minutes}:{secs}</div>
      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-900 font-medium hover:opacity-90"
        >
          {running ? <Pause size={18} /> : <Play size={18} />}
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => { setSeconds(INITIAL_SECONDS); setRunning(false); }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-white hover:bg-white/10"
        >
          <RotateCcw size={18} /> Reset
        </button>
      </div>
      <audio ref={audioRef} src="/chime.mp3" preload="auto" />
    </div>
  );
}
