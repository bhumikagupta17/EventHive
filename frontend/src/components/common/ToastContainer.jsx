import React from 'react';
import { useEvents } from '../../context/EventContext';

export const ToastContainer = () => {
  const { toastMessage } = useEvents();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <span>{toastMessage}</span>
    </div>
  );
};