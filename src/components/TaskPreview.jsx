import React from 'react';
import { CheckCircle2, Plus } from 'lucide-react';

const tasks = [
  { id: 1, title: 'Deep work: Write project brief', priority: 'High' },
  { id: 2, title: '30 min movement', priority: 'Medium' },
  { id: 3, title: 'Inbox to zero', priority: 'Low' },
];

export default function TaskPreview() {
  return (
    <div className="rounded-2xl border border-zinc-200/50 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Today’s Focus</h3>
        <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black text-sm hover:opacity-90">
          <Plus size={16} /> Add
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center justify-between rounded-xl border border-zinc-200/50 dark:border-white/10 px-3 py-2">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-emerald-500" size={20} />
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t.title}</p>
                <p className="text-xs text-zinc-500">Priority: {t.priority}</p>
              </div>
            </div>
            <button className="text-xs px-2 py-1 rounded-full border border-zinc-200/60 dark:border-white/15 hover:bg-zinc-50/50 dark:hover:bg-white/10">Done</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
