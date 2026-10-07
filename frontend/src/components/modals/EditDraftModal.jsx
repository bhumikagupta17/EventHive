import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export const EditDraftModal = ({
  isOpen,
  onClose,
  event,
  onSaveDraft
}) => {
  if (!isOpen || !event) return null;

  const [title, setTitle] = useState(event.title);
  const [dateDisplay, setDateDisplay] = useState(event.dateDisplay === 'TBD' ? '2024-12-05' : event.dateDisplay);
  const [location, setLocation] = useState(event.location);
  const [description, setDescription] = useState(event.description);
  const [maxCapacity, setMaxCapacity] = useState(event.maxCapacity.toString());

  const handlePublish = (e) => {
    e.preventDefault();
    const updated = {
      ...event,
      title,
      dateDisplay: dateDisplay === '2024-12-05' ? 'Dec 05, 2024' : dateDisplay,
      startDate: dateDisplay,
      location,
      description,
      maxCapacity: parseInt(maxCapacity) || 150,
      status: 'UPCOMING'
    };
    onSaveDraft(updated);
    onClose();
  };

  const handleSaveOnly = () => {
    const updated = {
      ...event,
      title,
      dateDisplay,
      location,
      description,
      maxCapacity: parseInt(maxCapacity) || 150
    };
    onSaveDraft(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Draft Event
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">
              Edit Draft & Publish
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handlePublish} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Event Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Event Date
              </label>
              <input
                type="text"
                value={dateDisplay}
                onChange={(e) => setDateDisplay(e.target.value)}
                placeholder="e.g. Dec 05, 2024"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
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
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleSaveOnly}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors cursor-pointer"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs shadow-sm shadow-indigo-200 transition-all cursor-pointer"
            >
              Publish to Campus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};