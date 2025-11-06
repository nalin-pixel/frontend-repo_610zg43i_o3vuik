import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function useSessionId() {
  return useMemo(() => {
    let id = localStorage.getItem('loopify_session_id');
    if (!id) {
      id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem('loopify_session_id', id);
    }
    return id;
  }, []);
}

export default function CoachChat() {
  const sessionId = useSessionId();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    fetch(`${BACKEND}/api/coach/messages?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((data) => setMessages(data))
      .catch(() => {});
  }, [sessionId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const content = input.trim();
    if (!content) return;
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/api/coach/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, role: 'user', content }),
      });
      const data = await res.json();
      if (data?.messages) {
        setMessages((prev) => [...prev, ...data.messages]);
      }
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section id="coach" className="rounded-xl bg-white/70 backdrop-blur border border-slate-200/60 shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-200/60 px-4 py-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
          <Bot size={18} />
        </div>
        <h2 className="text-sm font-semibold tracking-wide text-slate-900">Loop Coach</h2>
        <span className="ml-auto text-xs text-slate-500">Your gentle, practical guide</span>
      </div>

      <div className="max-h-[340px] overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-sm text-slate-500">
            Say hi and tell the coach what you want to focus on today.
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id || m.created_at} className={`flex items-start gap-2 ${m.role === 'assistant' ? '' : 'flex-row-reverse'}`}>
            <div className={`mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full ${m.role === 'assistant' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700'}`}>
              {m.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow ${m.role === 'assistant' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800'}`}>
              {m.content}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-slate-200/60 px-3 py-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Ask for a plan, clarity, or a nudge…"
          className="flex-1 resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow hover:bg-slate-800 disabled:opacity-50"
        >
          <Send size={16} />
          Send
        </button>
      </div>
    </section>
  );
}
