import React, { useState } from 'react';
import { X, Sparkles, Upload } from 'lucide-react';
import { CAMPUS_BUILDINGS } from '../../constants/categories';

const OTHER_BUILDING = 'Other (specify below)';

export const CreateEventModal = ({
  isOpen,
  onClose,
  onCreateEvent
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Academic & Tech');
  const [dateDisplay, setDateDisplay] = useState('');
  const [buildingChoice, setBuildingChoice] = useState(CAMPUS_BUILDINGS[0]);
  const [customLocation, setCustomLocation] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('150');
  const [price, setPrice] = useState('Free');
  const [description, setDescription] = useState('');
  const [organizerName, setOrganizerName] = useState('Campus Student Union');
  const [organizerEmail, setOrganizerEmail] = useState('events@campus.edu');
  const [bannerUrl, setBannerUrl] = useState('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80');

  // Resolved location: the picked campus building, or whatever the organizer typed if they chose "Other"
  const location = buildingChoice === OTHER_BUILDING ? customLocation : buildingChoice;

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: `evt-${Date.now()}`,
      title,
      category,
      dateDisplay: dateDisplay || 'Nov 30, 2024 • 6:00 PM',
      startDate: '2024-11-30',
      location: location || 'Campus Main Hall',
      price: price || 'Free',
      attendeesCount: 1,
      maxCapacity: parseInt(maxCapacity) || 200,
      bannerUrl: bannerUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      description: description || 'Exciting campus gathering with talks, networking and food.',
      organizer: {
        name: organizerName || 'Campus Student Association',
        contactEmail: organizerEmail || 'club@university.edu',
        verified: true
      },
      status: 'UPCOMING',
      bookmarked: false,
      attendeesList: [
        {
          id: 'att-creator-1',
          name: organizerName,
          email: organizerEmail,
          registeredDate: new Date().toISOString().split('T')[0],
          ticketType: 'VIP',
          status: 'Checked In'
        }
      ]
    };

    onCreateEvent(newEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm p-6 border-b border-slate-100 flex items-center justify-between z-10">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Campus Management
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">
              Create New Event
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Event Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AI & Robotics Hackathon 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="Academic & Tech">Academic & Tech</option>
                <option value="Career & Networking">Career & Networking</option>
                <option value="Social & Cultural">Social & Cultural</option>
                <option value="Arts & Music">Arts & Music</option>
                <option value="Sports & Fitness">Sports & Fitness</option>
                <option value="Workshops & Seminars">Workshops & Seminars</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Date & Time *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Fri, Dec 6 • 5:00 PM"
                value={dateDisplay}
                onChange={(e) => setDateDisplay(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Location / Venue *
              </label>
              <select
                required
                value={buildingChoice}
                onChange={(e) => setBuildingChoice(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {CAMPUS_BUILDINGS.map((building) => (
                  <option key={building} value={building}>{building}</option>
                ))}
                <option value={OTHER_BUILDING}>{OTHER_BUILDING}</option>
              </select>
              {buildingChoice === OTHER_BUILDING && (
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. Science Center, Room 302"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  className="w-full mt-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Max Capacity
              </label>
              <input
                type="number"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Banner Image URL
            </label>
            <input
              type="url"
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Tell students what to expect, who should attend, and any preparation instructions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Organizer Club / Host
              </label>
              <input
                type="text"
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Organizer Email
              </label>
              <input
                type="email"
                value={organizerEmail}
                onChange={(e) => setOrganizerEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white font-bold text-xs transition-all shadow-sm shadow-indigo-200 cursor-pointer"
            >
              Publish Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};