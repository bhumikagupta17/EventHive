import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Ticket,
  QrCode,
  Download,
  ArrowRight,
  Trash2,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useEvents } from '../context/EventContext';

export const MyRegistrationsPage = () => {
  const navigate = useNavigate();
  const { registrations, cancelRegistration, showToast } = useEvents();

  const handleDownloadPass = (reg) => {
    // Generate calendar file (.ics)
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EventHive//Campus Events//EN
BEGIN:VEVENT
SUMMARY:${reg.eventTitle}
LOCATION:${reg.eventLocation}
DESCRIPTION:Your registration code: ${reg.ticketCode} for ${reg.eventTitle}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${(reg.eventTitle || 'event').replace(/[^a-zA-Z0-9]/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Calendar invite (.ics) downloaded.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          My Registrations
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Access your digital event passes, venue details, and calendar downloads.
        </p>
      </div>

      {registrations.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
            <Ticket className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">No active registrations yet</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Explore upcoming campus hackathons, workshops, guest lectures, and student mixers to claim your digital pass.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs shadow-sm transition-all cursor-pointer"
          >
            <span>Browse Campus Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registrations.map(reg => (
            <div
              key={reg.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Event Top Banner */}
              <div
                onClick={() => navigate(`/events/${reg.eventId}`)}
                className="relative h-40 bg-slate-100 overflow-hidden cursor-pointer group"
              >
                <img
                  src={reg.bannerUrl}
                  alt={reg.eventTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-bold text-indigo-700 shadow-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Confirmed</span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                    {reg.ticketType} Pass
                  </span>
                  <h3
                    onClick={() => navigate(`/events/${reg.eventId}`)}
                    className="text-base font-extrabold text-slate-900 leading-snug hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    {reg.eventTitle}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{reg.eventDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{reg.eventLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Ticket Code Box & Actions */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-3 border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <QrCode className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">Pass Code</p>
                        <span className="font-mono text-xs font-black text-slate-800 tracking-wider">
                          {reg.ticketCode}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold bg-white px-2 py-1 rounded-lg border border-slate-100">
                      Valid at entry
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownloadPass(reg)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Add to Cal</span>
                    </button>
                    <Link
                      to={`/events/${reg.eventId}`}
                      className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl border border-slate-200 transition-colors"
                      title="View Event Details"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => cancelRegistration(reg.id)}
                      title="Cancel registration"
                      className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-slate-200 hover:border-rose-100 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};