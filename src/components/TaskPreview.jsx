import React, { useEffect, useState } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function TaskPreview() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const load = () => {
    fetch(`${BACKEND}/api/tasks`).then(r => r.json()).then(setTasks).catch(()=>{});
  };

  useEffect(() => { load(); }, []);

  const addTask = async () => {
    const t = title.trim();
    if (!t) return;
    setTitle('');
    await fetch(`${BACKEND}/api/tasks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: t }) });
    load();
  };

  const toggle = async (task) => {
    await fetch(`${BACKEND}/api/tasks/${task.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed: !task.completed }) });
    load();
  };

  return (
    <section className="rounded-xl border border-slate-200/60 bg-white/70 p-5 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold tracking-wide text-slate-900">Today's Focus</div>
        <div className="flex items-center gap-2">
          <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Add a task" className="rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10" />
          <button onClick={addTask} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white shadow hover:bg-slate-800"><Plus size={14}/>Add</button>
        </div>
      </div>

      <ul className="space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center justify-between rounded-lg border border-slate-200/60 bg-white px-3 py-2">
            <div className="flex items-center gap-3">
              <button onClick={() => toggle(t)} className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${t.completed ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}>
                <CheckCircle2 size={16} />
              </button>
              <span className={`text-sm ${t.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{t.title}</span>
            </div>
          </li>
        ))}
        {tasks.length === 0 && (
          <div className="text-sm text-slate-500">No tasks yet. Add your first focus.</div>
        )}
      </ul>
    </section>
  );
}
