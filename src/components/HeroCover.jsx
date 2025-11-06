import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative w-full h-[60vh] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 dark:from-black dark:via-zinc-900 dark:to-black">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/qMOKV671Z1CM9yS7/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient veil to improve text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-sm md:text-base tracking-wide text-zinc-300/90">Calm focus. Gentle momentum.</p>
        <h1 className="mt-2 text-3xl md:text-5xl font-semibold text-white/95">
          Loopify — Your Daily Operating System
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-300/90">
          Build habits, complete meaningful tasks, and keep a steady rhythm. Minimal, intentional, and beautifully simple.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button className="px-5 py-2.5 rounded-full bg-white text-black font-medium shadow/50 shadow-zinc-900 hover:shadow-lg hover:-translate-y-0.5 transition-all">
            Start a Focus Session
          </button>
          <button className="px-5 py-2.5 rounded-full border border-white/20 text-white/90 hover:bg-white/10 transition">
            Add Today’s Tasks
          </button>
        </div>
      </div>
    </section>
  );
}
