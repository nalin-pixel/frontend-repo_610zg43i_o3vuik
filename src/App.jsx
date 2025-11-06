import React from 'react';
import HeroCover from './components/HeroCover';
import TaskPreview from './components/TaskPreview';
import HabitLoops from './components/HabitLoops';
import FocusTimer from './components/FocusTimer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="font-semibold">Loopify</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-white/70">
          <a className="hover:text-white" href="#">Tasks</a>
          <a className="hover:text-white" href="#">Habits</a>
          <a className="hover:text-white" href="#">Focus</a>
          <a className="hover:text-white" href="#">Insights</a>
        </nav>
        <button className="px-4 py-2 rounded-xl bg-white text-slate-900 text-sm font-medium">Get Started</button>
      </header>

      <main className="max-w-6xl mx-auto px-6 space-y-10 pb-16">
        <HeroCover />

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <TaskPreview />
            <HabitLoops />
          </div>
          <div>
            <FocusTimer />
            <div className="mt-6 rounded-2xl border border-slate-200/10 bg-gradient-to-br from-emerald-400/10 via-cyan-400/10 to-fuchsia-400/10 p-6">
              <p className="text-white/80 leading-relaxed">
                "Small loops, big change." Keep your streaks alive and your focus sessions consistent. Your future self is cheering for you.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-6 pb-10 text-center text-white/50">
        Made with calm energy. © {new Date().getFullYear()} Loopify
      </footer>
    </div>
  );
}
