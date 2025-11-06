import React from 'react';
import HeroCover from './components/HeroCover';
import CoachChat from './components/CoachChat';
import InsightsDashboard from './components/InsightsDashboard';
import FocusTimer from './components/FocusTimer';
import HabitLoops from './components/HabitLoops';
import TaskPreview from './components/TaskPreview';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <header className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-slate-900" />
            <span className="text-lg font-semibold tracking-tight">Loopify</span>
          </div>
          <nav className="hidden gap-6 text-sm text-slate-500 md:flex">
            <a href="#coach" className="hover:text-slate-900">Coach</a>
            <a href="#insights" className="hover:text-slate-900">Insights</a>
            <a href="#focus" className="hover:text-slate-900">Focus</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 pb-12">
        <HeroCover />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="space-y-6 md:col-span-7">
            <CoachChat />
            <TaskPreview />
          </div>
          <div className="space-y-6 md:col-span-5">
            <FocusTimer />
            <HabitLoops />
          </div>
        </div>

        <div id="insights">
          <InsightsDashboard />
        </div>
      </main>

      <footer className="border-t border-slate-200/60 py-8 text-center text-sm text-slate-500">
        Built with care — stay in the loop.
      </footer>
    </div>
  );
}
