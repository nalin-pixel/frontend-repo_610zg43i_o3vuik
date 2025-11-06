import React, { useEffect, useState } from 'react';
import { BarChart3, Activity, Clock, CheckCircle2 } from 'lucide-react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function InsightsDashboard() {
  const [insights, setInsights] = useState({
    total_focus_minutes: 0,
    sessions_this_week: 0,
    tasks_completed: 0,
    habit_streaks: 0,
    trend: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/insights`);
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setInsights({
          total_focus_minutes: data.total_focus_minutes ?? 0,
          sessions_this_week: data.sessions_this_week ?? 0,
          tasks_completed: data.tasks_completed ?? 0,
          habit_streaks: data.habit_streaks ?? 0,
          trend: Array.isArray(data.trend) ? data.trend : [],
        });
      } catch (e) {
        // graceful fallback: keep defaults
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cards = [
    { label: 'Focus minutes', value: insights.total_focus_minutes, icon: Clock },
    { label: 'Sessions this week', value: insights.sessions_this_week, icon: Activity },
    { label: 'Tasks completed', value: insights.tasks_completed, icon: CheckCircle2 },
    { label: 'Habit streaks', value: insights.habit_streaks, icon: BarChart3 },
  ];

  return (
    <section className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 shadow-sm backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-semibold tracking-wide text-slate-900">Insights</div>
        {loading && <div className="text-xs text-slate-500">Loading…</div>}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-slate-200/60 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500">{c.label}</div>
              <c.icon size={16} className="text-slate-400" />
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900 tabular-nums">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-slate-200/60 bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-xs text-slate-500">Weekly Trend</div>
          <span className="text-xs text-slate-400">7 days</span>
        </div>
        <Sparkline data={insights.trend} />
      </div>
    </section>
  );
}

function Sparkline({ data = [] }) {
  // simple responsive sparkline; normalizes data 0..1
  const width = 600;
  const height = 80;
  const pad = 6;
  const n = Math.max(1, data.length);
  const max = Math.max(1, ...data, 1);
  const pts = data.map((v, i) => {
    const x = pad + (i * (width - pad * 2)) / Math.max(1, n - 1);
    const y = height - pad - (v / max) * (height - pad * 2);
    return `${x},${y}`;
  });

  if (data.length === 0) {
    return <div className="text-xs text-slate-400">Not enough data yet. Start a focus session to see your trend.</div>;
  }

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-24 w-full">
        <polyline
          fill="none"
          stroke="#0f172a"
          strokeWidth="2"
          points={pts.join(' ')}
        />
        {pts.map((p, i) => {
          const [x, y] = p.split(',').map(Number);
          return <circle key={i} cx={x} cy={y} r="2.5" fill="#0f172a" />;
        })}
      </svg>
    </div>
  );
}
