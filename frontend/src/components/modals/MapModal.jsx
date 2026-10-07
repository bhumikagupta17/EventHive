import React from 'react';
import { X, MapPin, Navigation, Compass, Building, Bus } from 'lucide-react';

export const MapModal = ({
  isOpen,
  onClose,
  locationName,
  detailName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Campus Map & Wayfinding
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 truncate max-w-xs">
                {locationName || 'Campus Venue'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Map Visualization Canvas */}
        <div className="p-6 space-y-4">
          <div className="relative h-56 w-full rounded-2xl bg-slate-900 overflow-hidden flex items-center justify-center text-white border border-slate-800 shadow-inner">
            {/* Grid pattern styling */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 text-center space-y-2 p-4">
              <div className="w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center mx-auto shadow-lg ring-4 ring-indigo-400/30 animate-bounce">
                <MapPin className="w-6 h-6" />
              </div>
              <p className="font-bold text-sm text-slate-100">{locationName}</p>
              <p className="text-xs text-indigo-200">{detailName || 'Zone 3 • Central Campus Quad'}</p>
            </div>

            <div className="absolute bottom-3 left-3 bg-slate-800/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-semibold text-slate-300 border border-slate-700">
              GPS: 37.7749° N, 122.4194° W
            </div>
          </div>

          {/* Transportation / Parking Guide */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Building className="w-3.5 h-3.5 text-indigo-600" />
                <span>Nearest Parking</span>
              </div>
              <p className="text-xs text-slate-500">Structure 4 (Student/Visitor permits accepted)</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Bus className="w-3.5 h-3.5 text-indigo-600" />
                <span>Transit Stop</span>
              </div>
              <p className="text-xs text-slate-500">Blue Line Shuttle @ North Library Plaza</p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              Close Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};