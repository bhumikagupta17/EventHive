import React from 'react';

export const Toast = ({ message, type = 'success' }) => {
  if (!message) return null;

  const dotColor = type === 'warning' ? 'bg-amber-400' : type === 'info' ? 'bg-indigo-400' : 'bg-emerald-400';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-800 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <span className={`w-2 h-2 rounded-full ${dotColor} animate-pulse shrink-0`} />
      <span className="leading-snug">{message}</span>
    </div>
  );
};