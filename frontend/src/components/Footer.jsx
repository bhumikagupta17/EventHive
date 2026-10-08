import React from 'react';
import { Calendar } from 'lucide-react';
import { useEvents } from '../context/EventContext';

export const Footer = () => {
  const { openInfoModal } = useEvents();

  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white">
                <Calendar className="w-4 h-4 text-white" strokeWidth={2.4} />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-indigo-900">
                EventHive
              </span>
            </div>
            <span className="hidden sm:inline text-slate-300">|</span>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} EventHive. Campus Event Management Platform.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
            <button
              onClick={() => openInfoModal('about')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => openInfoModal('privacy')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => openInfoModal('terms')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => openInfoModal('contact')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Contact
            </button>
            <button
              onClick={() => openInfoModal('help')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Help Center
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};