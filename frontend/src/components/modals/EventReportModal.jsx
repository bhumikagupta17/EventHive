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
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Total Registered
              </span>
              <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
                {event.attendeesCount.toLocaleString()}
              </span>
            </div>

            <div className="bg-indigo-50/70 rounded-2xl p-4 border border-indigo-100/60 text-center">
              <span className="text-[10px] font-bold uppercase text-indigo-600 block">
                Actual Turnout
              </span>
              <span className="text-2xl font-extrabold text-indigo-900 mt-1 block">
                94.8%
              </span>
            </div>

            <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-100/60 text-center">
              <span className="text-[10px] font-bold uppercase text-emerald-600 block">
                Satisfaction
              </span>
              <span className="text-2xl font-extrabold text-emerald-900 mt-1 block">
                4.9 / 5.0
              </span>
            </div>
          </div>

          {/* Department Breakdown Bar */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Attendee Demographic Breakdown
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Engineering & Computer Science</span>
                  <span>48%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: '48%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Business & Marketing</span>
                  <span>27%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '27%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Arts, Humanities & Science</span>
                  <span>25%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Event Highlights & Notes */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-600 space-y-2">
            <p className="font-bold text-slate-800">Executive Summary</p>
            <p>
              Capacity was exceeded by 32 attendees with smooth badge check-in queuing under 30 seconds average wait time. All 80 recruiter tables reported high candidate engagement.
            </p>
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