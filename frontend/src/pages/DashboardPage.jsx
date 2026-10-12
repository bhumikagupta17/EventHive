import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Calendar,
  Users,
  DollarSign,
  MapPin,
  Eye,
  FileText,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useEvents } from '../context/EventContext';

// Derive an event's status from its date since the backend has no status field
function getEventStatus(event) {
  if (!event.date) return 'UPCOMING';
  return new Date(event.date) < new Date() ? 'PAST' : 'UPCOMING';
}

// Try to parse a numeric price value from the price string (e.g. "$15" → 15, "Free" → 0)
function parsePriceValue(event) {
  if (event.isFree) return 0;
  const num = parseFloat(String(event.price).replace(/[^0-9.]/g, ''));
  return Number.isFinite(num) ? num : 0;
}

export const DashboardPage = () => {
  const navigate = useNavigate();
  const {
    events,
    openCreateEventModal,
    openDraftModal,
    openReportModal,
    deleteEvent
  } = useEvents();

  const [showAllEvents, setShowAllEvents] = useState(false);

  // Metrics derived from real event data
  const activeEventsCount = events.filter(e => getEventStatus(e) === 'UPCOMING').length;
  const totalAttendeesSum = events.reduce((sum, e) => sum + (e.attendeesCount || 0), 0);
  // Estimated revenue: attendees × ticket price for events the organizer owns (attendeesCount present)
  const totalRevenueSum = events.reduce((sum, e) => {
    if (typeof e.attendeesCount !== 'number') return sum;
    return sum + e.attendeesCount * parsePriceValue(e);
  }, 0);

  const visibleEvents = showAllEvents ? events : events.slice(0, 3);

  const getStatusBadge = (event) => {
    const status = getEventStatus(event);
    switch (status) {
      case 'UPCOMING':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
            UPCOMING
          </span>
        );
      case 'PAST':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500">
            PAST
          </span>
        );
      default:
        return null;
    }
  };

  const handleViewAttendees = (event) => {
    navigate(`/events/${event._id || event.id}/attendees`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in duration-200">
      {/* Header Row: Title, Subtitle, and Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Organizer Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your events, track registrations, and analyze attendance performance.
          </p>
        </div>

        <button
          id="btn-create-new-event"
          onClick={openCreateEventModal}
          className="inline-flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-sm shadow-indigo-200 hover:shadow transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* 3 Metric KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Active Events */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Active Events</span>
          </div>
          <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {activeEventsCount}
          </div>
        </div>

        {/* Card 2: Total Attendees — only counts events where the backend returned attendeesCount */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Users className="w-4 h-4 text-slate-400" />
            <span>Total Attendees</span>
          </div>
          <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {totalAttendeesSum.toLocaleString()}
          </div>
        </div>

        {/* Card 3: Estimated revenue from owned events with known attendee counts */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <DollarSign className="w-4 h-4 text-slate-400" />
            <span>Est. Revenue</span>
          </div>
          <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
            ${totalRevenueSum.toLocaleString()}
          </div>
        </div>
      </div>

      {/* "Your Events" List Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">
          Your Events
        </h2>

        {events.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-10 text-center text-slate-500 text-sm">
            You haven't created any events yet.
          </div>
        ) : (
          <div className="space-y-4">
            {visibleEvents.map(event => {
              const status = getEventStatus(event);
              return (
                <div
                  key={event._id || event.id}
                  id={`dashboard-event-row-${event._id || event.id}`}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Left Group: Image + Info */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                    <div
                      onClick={() => navigate(`/events/${event.id}`)}
                      className="w-full sm:w-44 h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 cursor-pointer group"
                    >
                      <img
                        src={event.bannerUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>

                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(event)}
                        <span className="text-xs font-medium text-slate-500">
                          {event.dateDisplay}
                        </span>
                      </div>

                      <h3
                        onClick={() => navigate(`/events/${event._id || event.id}`)}
                        className="text-base sm:text-lg font-bold text-slate-900 truncate hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        {event.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Group: Attendee Numbers + Action Buttons */}
                  <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 shrink-0">
                    {/* Numbers */}
                    <div className="text-left md:text-right">
                      <div className="text-sm font-bold text-slate-900">
                        {typeof event.attendeesCount === 'number' ? (
                          <span>
                            {event.attendeesCount.toLocaleString()} / {(event.maxCapacity || 0).toLocaleString()}
                          </span>
                        ) : (
                          <span>— / {(event.maxCapacity || 0).toLocaleString()}</span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">
                        Attendees
                      </div>
                    </div>

                    {/* Primary Row Actions */}
                    <div className="flex items-center gap-2">
                      {status === 'UPCOMING' && (
                        <button
                          id={`btn-view-attendees-${event._id || event.id}`}
                          onClick={() => handleViewAttendees(event)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>View Attendees</span>
                        </button>
                      )}

                    {status === 'PAST' && (
                        <button
                          id={`btn-view-attendees-past-${event._id || event.id}`}
                          onClick={() => openReportModal(event)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-500" />
                          <span>View Report</span>
                        </button>
                      )}

                      {/* Delete button — confirmation is handled inside deleteEvent */}
                      <button
                        onClick={() => deleteEvent(event._id || event.id)}
                        title="Delete event"
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load more toggle */}
        {events.length > 3 && (
          <div className="pt-2 text-center">
            <button
              onClick={() => setShowAllEvents(!showAllEvents)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              <span>{showAllEvents ? 'Show less' : 'Load more events'}</span>
              {showAllEvents ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};