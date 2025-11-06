import React from 'react';
import { CheckCircle2, Plus, Clock } from 'lucide-react';

const demoTasks = [
  { id: 1, title: 'Deep work: Feature spec draft', time: '45m' },
  { id: 2, title: 'Review pull requests', time: '25m' },
  { id: 3, title: 'Read 10 pages', time: '15m' },
];

export default function TaskPreview() {
  return (
    <div className="rounded-2xl border border-slate-200/10 bg-white/5 backdrop-blur p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Today’s Focus</h3>
        <button className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition">
          <Plus size={14} /> Add
        </button>
      </div>
      <ul className="space-y-3">
        {demoTasks.map((t) => (
          <li key={t.id} className="flex items-center justify-between rounded-xl bg-slate-900/50 border border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <button className="text-emerald-400/80 hover:text-emerald-400 transition">
                <CheckCircle2 size={20} />
              </button>
              <span className="text-white/90">{t.title}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Clock size={16} />
              {t.time}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
