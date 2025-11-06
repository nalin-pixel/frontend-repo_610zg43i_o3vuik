import React from 'react';
import HeroCover from './components/HeroCover';
import CoachChat from './components/CoachChat';
import TaskPreview from './components/TaskPreview';
import FocusTimer from './components/FocusTimer';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <HeroCover />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <TaskPreview />
            <CoachChat />
          </div>
          <div className="space-y-6">
            <FocusTimer />
          </div>
        </div>
      </div>
    </div>
  );
}
