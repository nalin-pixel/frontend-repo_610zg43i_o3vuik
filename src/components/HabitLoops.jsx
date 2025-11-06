import React from 'react';

function Ring({ size = 88, stroke = 8, progress = 0.72, color = '#22d3ee', label = 'Meditate' }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * progress;
  const gap = circumference - dash;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1f2937"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${gap}`}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="mt-3 text-white/90 text-sm font-medium">{label}</span>
      <span className="text-white/60 text-xs">{Math.round(progress * 100)}%</span>
    </div>
  );
}

export default function HabitLoops() {
  const habits = [
    { label: 'Meditate', progress: 0.8, color: '#22d3ee' },
    { label: 'Workout', progress: 0.62, color: '#a78bfa' },
    { label: 'Journal', progress: 0.45, color: '#34d399' },
    { label: 'Learn', progress: 0.73, color: '#f472b6' },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/10 bg-white/5 backdrop-blur p-5">
      <h3 className="text-white font-semibold mb-4">Habit Loops</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {habits.map((h) => (
          <Ring key={h.label} label={h.label} progress={h.progress} color={h.color} />
        ))}
      </div>
    </div>
  );
}
