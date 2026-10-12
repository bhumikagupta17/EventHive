import React from 'react';
import { X, TrendingUp, Users, CheckCircle2, Award, Clock, ArrowDownToLine } from 'lucide-react';

export const EventReportModal = ({
  isOpen,
  onClose,
  event
}) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Post-Event Analytics Report
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">
              {event.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Top 3 Stats Grid */}
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Total Registered
              </span>
              <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
                {(event.attendeesCount ?? 0).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Close Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};