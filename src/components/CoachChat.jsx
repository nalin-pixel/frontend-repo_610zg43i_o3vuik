import React, { useEffect, useRef, useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function CoachChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey! What loop are we closing today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/coach/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply || 'Got it! Let\'s plan the next step.' }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'I\'m having trouble reaching the server. Try setting VITE_BACKEND_URL.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
        <Bot className="h-4 w-4 text-slate-700" />
        <h3 className="text-sm font-semibold text-slate-800">AI Coach</h3>
      </div>

      <div ref={listRef} className="min-h-[220px] flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex items-start gap-2 ${m.role === 'user' ? 'justify-end' : ''}`}>
            {m.role === 'assistant' && (
              <div className="mt-0.5 rounded-full bg-slate-100 p-1">
                <Bot className="h-4 w-4 text-slate-700" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm shadow-sm ${
              m.role === 'user' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'
            }`}>
              {m.content}
            </div>
            {m.role === 'user' && (
              <div className="mt-0.5 rounded-full bg-slate-900 p-1 text-white">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="text-center text-xs text-slate-500">Thinking…</div>
        )}
      </div>

      <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-slate-200 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for a plan, break down tasks, or get tips…"
          className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300"
        />
        <button
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          Send
        </button>
      </form>
    </section>
  );
}
