import React from 'react';
import HeroCover from './components/HeroCover';
import TaskPreview from './components/TaskPreview';
import HabitLoops from './components/HabitLoops';
import FocusTimer from './components/FocusTimer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600" />
            <span className="text-lg font-semibold">Loopify</span>
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Calm habits • Focused flow</div>
        </header>

        <HeroCover />

        <main className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TaskPreview />
            <HabitLoops />
          </div>
          <div className="lg:col-span-1">
            <FocusTimer />
          </div>
        </main>

        <section className="mt-10 rounded-2xl border border-zinc-200/50 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur p-5 text-center">
          <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300">
            “You’re getting stronger with every loop. Small steps today, big change tomorrow.”
          </p>
        </section>
      </div>
    </div>
  );
}

export default App;
