import React from 'react';
import { MapPin, Clock, Bookmark } from 'lucide-react';
import { Badge } from '../common/Badge';

export const EventCard = ({
  event,
  onSelect,
  onToggleBookmark
}) => {
  return (
    <div
      id={`event-card-${event.id}`}
      onClick={() => onSelect(event.id)}
      className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Card Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={event.bannerUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Category Tag Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="category" category={event.category}>
            {event.category}
          </Badge>
        </div>

        {/* Bookmark Button */}
        <button
          id={`bookmark-${event.id}`}
          onClick={(e) => onToggleBookmark(event.id, e)}
          title={event.bookmarked ? 'Remove bookmark' : 'Bookmark event'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer ${
            event.bookmarked
              ? 'bg-indigo-600 text-white'
              : 'bg-white/80 text-slate-600 hover:bg-white hover:text-indigo-600'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${event.bookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-1">
            {event.title}
          </h3>

          <div className="space-y-1.5 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{event.dateDisplay}</span>
            </div>
          </div>
        </div>

        {/* Divider & Bottom Meta Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {/* Left: Avatar Stack & Count */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-indigo-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-700">
                {event.title.charAt(0)}
              </div>
              <div className="w-6 h-6 rounded-full bg-purple-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-purple-700">
                {event.category.charAt(0)}
              </div>
            </div>
            {/* attendeesCount is only present when the viewer organizes this event —
                the backend omits it for everyone else, so we just don't render it here */}
            {typeof event.attendeesCount === 'number' && (
              <span className="font-semibold text-slate-600">
                {event.attendeesCount.toLocaleString()}
              </span>
            )}
          </div>

          {/* Right: Price */}
          <div className="font-semibold text-indigo-700 text-sm">
            {event.price}
          </div>
        </div>
      </div>
    </div>
  );
};