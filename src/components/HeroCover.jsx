import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Sparkles } from 'lucide-react';

export default function HeroCover() {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-white shadow-sm">
      <div className="h-[380px] w-full">
        <Spline
          scene="https://prod.spline.design/6h7eIYkKzqz8c1nP/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        {/* Soft gradient overlay that doesn't block interactions */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/70 via-white/20 to-transparent" />
      </div>

      <div className="px-6 pb-8 pt-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            <Sparkles className="h-3.5 w-3.5" />
            AI-powered productivity loops
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Loopify — Focus, build habits, and close the loop
          </h1>
          <p className="mt-3 text-slate-600 md:text-lg">
            A minimal workspace with an AI coach, tasks, habit loops, and insights to help you get into flow.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
              <Rocket className="h-4 w-4" />
              Start a focus session
            </button>
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
              Explore insights
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
