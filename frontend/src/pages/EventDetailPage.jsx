import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Share2,
  Bookmark,
  CheckCircle2,
  Compass,
  Download,
  Mail,
  AlertCircle
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { exportEventToICS } from '../utils/exportUtils';

export const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const {
    events,
    registrations,
    user,
    toggleBookmark,
    openRegisterModal,
    openMapModal,
    openContactModal,
    showToast
  } = useEvents();

  const event = events.find(e => e.id === eventId);
  const isUserRegistered = registrations.some(r => r.eventId === event?.id);
  // attendeesCount only exists on the event object when the backend recognizes
  // the current user as this event's organizer — everyone else never receives it
  const canSeeAttendeeCount = typeof event?.attendeesCount === 'number';

  if (!event) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Event Not Found</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          The campus event you are looking for does not exist or may have been removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Browse</span>
        </Link>
      </div>
    );
  }

  const isPast = event.status === 'PAST';

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Event link copied to clipboard!');
    }
  };

  const handleDownloadCalendar = () => {
    exportEventToICS(event);
    showToast('Calendar invite (.ics) downloaded.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          id="btn-back-to-browse"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors py-1.5 px-3 rounded-xl hover:bg-slate-100 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadCalendar}
            title="Download Calendar (.ics) Invite"
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Add to Calendar</span>
          </button>
          <button
            onClick={handleShare}
            title="Share Event"
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={e => toggleBookmark(event.id, e)}
            title="Bookmark"
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              event.bookmarked
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${event.bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main 2-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Hero Banner + Description */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            {/* Banner Image */}
            <div className="relative h-72 sm:h-96 w-full bg-slate-100 overflow-hidden">
              <img
                src={event.bannerUrl}
                alt={event.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="category" category={event.category}>
                  {event.category}
                </Badge>
                {event.status && (
                  <Badge variant="status" status={event.status}>
                    {event.status}
                  </Badge>
                )}
              </div>
            </div>

            {/* Main Header Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {event.title}
                </h1>
                {event.subtitle && (
                  <p className="text-base text-slate-600 font-medium">
                    {event.subtitle}
                  </p>
                )}
              </div>

              {/* Meta Information Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-slate-100 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Date & Time</span>
                    <span>{event.timeDisplay || event.dateDisplay}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Venue & Building</span>
                    <span>{event.location}</span>
                    {event.roomOrDetail && (
                      <span className="text-slate-400 block">{event.roomOrDetail}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* About the Event */}
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900">About the Event</h2>
                <div className="text-sm text-slate-600 leading-relaxed space-y-3 whitespace-pre-line">
                  {event.fullAbout || event.description}
                </div>
              </div>

              {/* What to Expect */}
              {event.expectations && event.expectations.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h2 className="text-lg font-bold text-slate-900">What to Expect</h2>
                  <div className="space-y-2.5">
                    {event.expectations.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky RSVP Registration & Host Card */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* Registration Ticket Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Registration & Passes
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-slate-900">
                  {event.price}
                </span>
                {/* Only the organizer who owns this event ever receives attendeesCount from the backend */}
                {canSeeAttendeeCount && (
                  <span className="text-xs text-slate-500 font-semibold">
                    {event.attendeesCount} registered
                  </span>
                )}
              </div>
            </div>

            {/* Capacity Progress — organizer-only, same reason as above */}
            {canSeeAttendeeCount && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Capacity</span>
                  <span className="font-semibold text-slate-700">
                    {event.attendeesCount} / {event.maxCapacity} seats
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.round((event.attendeesCount / event.maxCapacity) * 100))}%`
                    }}
                  />
                </div>
              </div>
            )}

            {/* Register CTA Button */}
            {isPast ? (
              <button
                disabled
                className="w-full py-3.5 rounded-2xl bg-slate-100 text-slate-400 font-bold text-sm cursor-not-allowed"
              >
                Event Concluded
              </button>
            ) : isUserRegistered ? (
              <button
                id="btn-view-digital-pass"
                onClick={() => navigate('/registrations')}
                className="w-full py-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>You're Registered! (View Pass)</span>
              </button>
            ) : (
              <button
                id="btn-register-cta"
                onClick={e => openRegisterModal(event, e)}
                className="w-full py-3.5 rounded-2xl bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white font-bold text-sm shadow-md shadow-indigo-200 transition-all cursor-pointer"
              >
                Register Now ({event.price})
              </button>
            )}

            {/* Interactive Campus Map & Directions Button */}
            <button
              onClick={() => openMapModal(event.location, event.roomOrDetail)}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Campus Map & Directions</span>
            </button>
          </div>

          {/* Organizer Card */}
          {event.organizer && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Event Host & Department
              </span>
              <div className="flex items-center gap-3">
                <Avatar
                  name={event.organizer.name}
                  src={event.organizer.avatarUrl}
                  size="lg"
                  bgColor="bg-indigo-600"
                />
                <div className="overflow-hidden">
                  <h3 className="font-extrabold text-slate-900 text-sm truncate">
                    {event.organizer.name}
                  </h3>
                  <p className="text-xs text-slate-500">{event.organizer.type}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => openContactModal(event.organizer)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>Contact Host ({event.organizer.contactEmail})</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};