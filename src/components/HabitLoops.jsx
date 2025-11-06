import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function Ring({ ratio = 0 }) {
  const size = 84;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = Math.max(0, Math.min(c, ratio * c));
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} stroke="#e2e8f0" strokeWidth={stroke} fill="none" />
      <circle
        cx={size/2}
        cy={size/2}
        r={r}
        stroke="#0f172a"
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={`${dash} ${c - dash}`}
        transform={`rotate(-90 ${size/2} ${size/2})`}
      />
    </svg>
  );
}

export default function HabitLoops() {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState('');

  const load = () => {
    fetch(`${BACKEND}/api/habits`).then(r => r.json()).then(setHabits).catch(()=>{});
  };

  useEffect(() => { load(); }, []);

  const addHabit = async () => {
    const title = name.trim();
    if (!title) return;
    setName('');
    await fetch(`${BACKEND}/api/habits`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: title, target: 1, progress: 0, period: 'daily' }) });
    load();
  };

  const bump = async (h) => {
    const next = (h.progress || 0) + 1;
    await fetch(`${BACKEND}/api/habits/${h.id}/progress?progress=${next}`, { method: 'PATCH' });
    load();
  };

  return (
    <section className="rounded-xl border border-slate-200/60 bg-white/70 p-5 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold tracking-wide text-slate-900">Habit Loops</div>
        <div className="flex items-center gap-2">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="New habit" className="rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10" />
          <button onClick={addHabit} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white shadow hover:bg-slate-800"><Plus size={14}/>Add</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {habits.map((h) => {
          const ratio = (h.progress || 0) / Math.max(1, h.target || 1);
          return (
            <button key={h.id} onClick={() => bump(h)} className="group rounded-xl border border-slate-200/60 bg-white p-4 text-left hover:shadow">
              <div className="flex items-center gap-3">
                <Ring ratio={ratio} />
                <div>
                  <div className="text-sm font-medium text-slate-900">{h.name}</div>
                  <div className="text-xs text-slate-500">{h.progress || 0}/{h.target || 1}</div>
                </div>
              </div>
            </button>
          );
        })}
        {habits.length === 0 && (
          <div className="col-span-full text-sm text-slate-500">No habits yet. Add one to start a loop.</div>
        )}
      </div>
    </section>
  );
}
