import React from 'react';

function Ring({ percent = 70, label = 'Read', color = '#22c55e' }) {
  const radius = 28;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg height={radius * 2} width={radius * 2} className="drop-shadow-sm">
        <circle
          stroke="rgba(255,255,255,0.15)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeLinecap="round"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.8s ease' }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <span className="mt-2 text-xs font-medium text-zinc-800 dark:text-zinc-200">{label}</span>
    </div>
  );
}

export default function HabitLoops() {
  const loops = [
    { label: 'Read', percent: 80, color: '#eab308' },
    { label: 'Steps', percent: 45, color: '#22d3ee' },
    { label: 'Sleep', percent: 65, color: '#a78bfa' },
    { label: 'No Screen', percent: 30, color: '#34d399' },
  ];

  return (
    <div className="rounded-2xl border border-zinc-200/50 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Habit Loops</h3>
        <span className="text-xs text-zinc-500">Streaks • Consistency</span>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-4">
        {loops.map((l) => (
          <Ring key={l.label} percent={l.percent} label={l.label} color={l.color} />
        ))}
      </div>
    </div>
  );
}
