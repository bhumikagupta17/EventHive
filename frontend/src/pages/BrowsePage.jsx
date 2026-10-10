import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Sparkles, X, Bookmark, ArrowUpDown } from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { EventCard } from '../components/events/EventCard';
import { CATEGORY_FILTER_OPTIONS } from '../constants/categories';

export const BrowsePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { events, toggleBookmark } = useEvents();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'All categories');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('ALL');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [sortBy, setSortBy] = useState('date');

  // Filter & Sort
  const filteredEvents = useMemo(() => {
    return events
      .filter(event => {
        if (showBookmarksOnly && !event.bookmarked) return false;
        if (selectedCategory !== 'All categories' && event.category !== selectedCategory) return false;
        if (selectedPriceFilter === 'FREE' && !event.isFree) return false;
        if (selectedPriceFilter === 'PAID' && event.isFree) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = event.title.toLowerCase().includes(q);
          const matchesDesc = event.description?.toLowerCase().includes(q);
          const matchesLoc = event.location?.toLowerCase().includes(q);
          const matchesOrg = event.organizer?.name?.toLowerCase().includes(q);
          if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesOrg) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price') return (a.priceValue || 0) - (b.priceValue || 0);
        return (a.startDate || '').localeCompare(b.startDate || '');
      });
  }, [events, searchQuery, selectedCategory, selectedPriceFilter, showBookmarksOnly, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== 'All categories' ? 1 : 0) +
    (selectedPriceFilter !== 'ALL' ? 1 : 0) +
    (showBookmarksOnly ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All categories');
    setSelectedPriceFilter('ALL');
    setShowBookmarksOnly(false);
    setSortBy('date');
  };

  const handleSelectEvent = (eventId) => navigate(`/events/${eventId}`);

  return (
    <>
      {/* Dancing Script font for the cursive headline */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        .font-dancing { font-family: 'Dancing Script', cursive; }
      `}</style>

      {/* ── Hero Section ───────────────────────────────────────────────── */}
      <section className="w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">

          {/* pill badge */}
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-2 rounded-full shadow-sm">
            <span>⚡ </span>
            <span>Don't miss what's next</span>
          </div>

          {/* headline */}
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            Find your next
            <br />
            <span
              className="font-dancing text-indigo-600"
              style={{ fontSize: '1.15em', lineHeight: '1.3' }}
            >
              event on campus.
            </span>
          </h1>

          {/* subtitle */}
          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Hackathons, poetry slams, football finals — one warm little hive
            to keep track of it all.
          </p>

          {/* live stats */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 text-base">{events.length}</span>
              <span className="text-slate-500">events waiting</span>
            </div>
            <div className="w-px h-5 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-500">Updated live</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Browse Section ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">

        {/* Top row: title + saved-events toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Campus Life &amp; Activities
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Upcoming on campus
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mt-1.5 leading-relaxed">
              Explore university hackathons, guest lectures, club mixers, athletic games, and creative arts workshops.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="btn-filter-saved-events"
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                showBookmarksOnly
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-current' : ''}`} />
              <span>Saved Events ({events.filter(e => e.bookmarked).length})</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

            {/* Search Bar */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="input-search-events"
                type="text"
                placeholder="Search by title, hall, topic, or host..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-3">
              <select
                id="select-category-filter"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
              >
                {CATEGORY_FILTER_OPTIONS.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="md:col-span-3 flex rounded-xl border border-slate-200/80 overflow-hidden bg-slate-50 p-0.5">
              {['ALL', 'FREE', 'PAID'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setSelectedPriceFilter(filter)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    selectedPriceFilter === filter
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {filter === 'ALL' ? 'All Prices' : filter[0] + filter.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Category Quick Tags + Sort */}
          <div className="flex items-center justify-between gap-2 flex-wrap pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] shrink-0 mr-1">
                Categories:
              </span>
              {CATEGORY_FILTER_OPTIONS.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg shrink-0 font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                      : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 ml-auto text-xs">
              <div className="flex items-center gap-1.5 text-slate-500">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-transparent text-slate-700 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="date">Upcoming Date</option>
                  <option value="price">Price (Low to High)</option>
                </select>
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-rose-600 hover:underline font-bold shrink-0 cursor-pointer ml-2"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Event Grid / Empty State */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No matching campus events</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search keywords or resetting active category and price filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-indigo-600 hover:underline pt-2 cursor-pointer"
            >
              Clear all active filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={handleSelectEvent}
                onToggleBookmark={(id, e) => toggleBookmark(id, e)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};