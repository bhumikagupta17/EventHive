import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Calendar } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 animate-in fade-in duration-200">
      <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-xs border border-indigo-100">
        <Compass className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">404 Error</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          The page or campus event you are looking for might have been moved, renamed, or is temporarily unavailable.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white font-bold text-xs shadow-sm shadow-indigo-200 transition-all w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse Events</span>
        </Link>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all w-full sm:w-auto"
        >
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Organizer Dashboard</span>
        </Link>
      </div>
    </div>
  );
};