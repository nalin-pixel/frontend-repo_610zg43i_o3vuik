import React, { useEffect, useState } from 'react';
import { CheckCircle2, Plus } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function TaskPreview() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/tasks?limit=5`);
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setTasks(data.items || []);
    } catch (e) {
      setTasks([
        { _id: '1', title: 'Write daily plan', done: false },
        { _id: '2', title: '25m focus on project', done: true },
      ]);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('Failed');
      setTitle('');
      loadTasks();
    } catch (e) {
      setTasks((prev) => [{ _id: Math.random().toString(), title, done: false }, ...prev]);
      setTitle('');
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (id) => {
    try {
      await fetch(`${API_BASE}/api/tasks/${id}/toggle`, { method: 'POST' });
      loadTasks();
    } catch (e) {
      setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t)));
    }
  };

  return (
    <section className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">Today\'s tasks</h3>
      </div>

      <form onSubmit={addTask} className="mb-3 flex items-center gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task…"
          className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300"
        />
        <button disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 disabled:opacity-50">
          <Plus className="h-4 w-4" />
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {tasks.map((t) => (
          <li key={t._id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
            <div className="flex items-center gap-2">
              <button onClick={() => toggleTask(t._id)} className={`rounded-full p-1 ${t.done ? 'text-emerald-600' : 'text-slate-400'}`}
                aria-label="Toggle task">
                <CheckCircle2 className="h-5 w-5" />
              </button>
              <span className={`text-sm ${t.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{t.title}</span>
            </div>
          </li>
        ))}
        {tasks.length === 0 && (
          <li className="text-sm text-slate-500">No tasks yet. Add your first one above.</li>
        )}
      </ul>
    </section>
  );
}
