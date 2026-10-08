import React from 'react';
import { X, Calendar, ShieldCheck, FileText, HelpCircle, Mail } from 'lucide-react';

export const InfoModal = ({ type, onClose }) => {
  if (!type) return null;

  const getContent = () => {
    switch (type) {
      case 'about':
        return {
          title: 'About EventHive',
          icon: <Calendar className="w-5 h-5 text-indigo-600" />,
          body: (
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong>EventHive</strong> is the centralized campus event discovery, registration, and organizer intelligence platform designed specifically for university students, faculties, and collegiate student organizations.
              </p>
              <p>
                From 48-hour flagship hackathons to intimate poetry open mics and athletic championships, EventHive gives campus leaders real-time attendee rosters, contactless digital check-in tools, and live registration analytics.
              </p>
            </div>
          )
        };
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
          body: (
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                EventHive treats student and faculty privacy with highest campus security standards. Student ID records and contact emails are exclusively used for registration verification and attendance validation.
              </p>
              <p>
                We do not sell student contact lists to external commercial brokers. Organizers may only access attendee data for logistical purposes relating directly to registered events.
              </p>
            </div>
          )
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          icon: <FileText className="w-5 h-5 text-indigo-600" />,
          body: (
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                All events published on EventHive must adhere to official University Student Code of Conduct regulations and campus safety guidelines.
              </p>
              <p>
                Organizers are responsible for maintaining accurate venue safety caps and ensuring verified check-in procedures. Free registrations can be cancelled up to 24 hours prior to starting time.
              </p>
            </div>
          )
        };
      case 'help':
        return {
          title: 'Help & FAQ Center',
          icon: <HelpCircle className="w-5 h-5 text-indigo-600" />,
          body: (
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <div>
                <p className="font-bold text-slate-900">How do I check in at an event?</p>
                <p className="text-slate-500">Present your digital QR code or Pass Code from "My Registrations" at the entrance scanner.</p>
              </div>
              <div>
                <p className="font-bold text-slate-900">How do I create an event for my club?</p>
                <p className="text-slate-500">Navigate to the Organizer Dashboard and click "+ Create New Event" to publish immediately or save as draft.</p>
              </div>
              <div>
                <p className="font-bold text-slate-900">Can I export attendee check-in logs?</p>
                <p className="text-slate-500">Yes, in Attendee Management click "Export CSV" to download real-time attendance rosters.</p>
              </div>
            </div>
          )
        };
      case 'contact':
        return {
          title: 'Contact EventHive Support',
          icon: <Mail className="w-5 h-5 text-indigo-600" />,
          body: (
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                Need assistance with an event or university partnership?
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                <p className="font-bold text-slate-800">Campus Helpdesk</p>
                <p className="text-indigo-600 font-medium">support@eventhive.campus.edu</p>
                <p className="text-slate-500 text-xs">Student Union, Room 204 • Mon-Fri 9AM-5PM</p>
              </div>
            </div>
          )
        };
      default:
        return { title: '', icon: null, body: null };
    }
  };

  const { title, icon, body } = getContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center">
              {icon}
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {body}
          <div className="pt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};