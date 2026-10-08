import React, { useState } from 'react';
import { X, Ticket, CalendarDays, MapPin } from 'lucide-react';
import { Avatar } from '../common/Avatar.jsx';

const TICKET_TYPES = ['General', 'VIP', 'Student'];

export const RegisterModal = ({
  event,
  isOpen,
  onClose,
  onConfirmRegistration,
  initialUser
}) => {
  const [ticketType, setTicketType] = useState('General');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !event) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onConfirmRegistration({
        eventId: event.id,
        eventTitle: event.title,
        ticketType
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Confirm Registration
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 line-clamp-1">
              {event.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Event Summary */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
            {event.dateDisplay && (
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <CalendarDays className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>{event.dateDisplay}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>{event.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Ticket className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{event.price}</span>
            </div>
          </div>

          {/* Registering As */}
          {initialUser && (
            <div className="flex items-center gap-3 px-1">
              <Avatar name={initialUser.name} size="sm" />
              <div className="text-xs">
                <p className="font-bold text-slate-800">{initialUser.name}</p>
                <p className="text-slate-500">{initialUser.email}</p>
              </div>
            </div>
          )}

          {/* Ticket Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Pass Type
            </label>
            <select
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
            >
              {TICKET_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs shadow-sm shadow-indigo-200 transition-all cursor-pointer"
            >
              {submitting ? 'Registering...' : 'Confirm Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
