import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Play } from 'lucide-react';

export default function HeroCover() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/6ZtHjKfX3I8s7w0R/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-900/40 to-slate-950/80" />

      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-white/80 text-xs mb-4">
            <Rocket size={14} />
            <span>Loopify • Focus on what matters</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
            Build habits. Stay in flow.
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed">
            An Apple-inspired companion for tasks, habits, and mindful focus. Elegant, light, and distraction-free.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 font-medium shadow/10 shadow-white/10 hover:shadow-white/20 transition">
              <Play size={16} />
              Start Focus
            </button>
            <button className="px-5 py-2.5 rounded-xl border border-white/20 text-white hover:bg-white/10 transition">
              Explore Habits
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
