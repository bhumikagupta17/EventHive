import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Calendar, User, LogIn, Sparkles } from 'lucide-react';
import { useEvents } from '../context/EventContext';

export const Navbar = () => {
  const { registrations, user, logout, openAuthModal } = useEvents();
  const location = useLocation();

  const isBrowseActive = location.pathname === '/' || location.pathname.startsWith('/events');
  const isDashboardActive = location.pathname.startsWith('/dashboard') || location.pathname.includes('/attendees');
  const isRegistrationsActive = location.pathname === '/registrations';

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          to="/"
          id="brand-logo"
          className="flex items-center gap-2.5 group select-none cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
            <div className="relative">
              <Calendar className="w-5 h-5 text-white" strokeWidth={2.4} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full border border-white" />
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-xl font-extrabold tracking-tight text-indigo-900 group-hover:text-indigo-600 transition-colors">
              EventHive
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          <NavLink
            to="/"
            end
            id="nav-tab-browse"
            className={({ isActive }) =>
              `h-full flex items-center text-sm font-semibold relative transition-colors px-1 ${
                isActive || isBrowseActive && !isDashboardActive
                  ? 'text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900'
              }`
            }
          >
            <span>Browse</span>
            {(isBrowseActive && !isDashboardActive) && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </NavLink>

          <NavLink
            to="/registrations"
            id="nav-tab-registrations"
            className={({ isActive }) =>
              `h-full flex items-center gap-2 text-sm font-semibold relative transition-colors px-1 ${
                isActive ? 'text-indigo-700' : 'text-slate-600 hover:text-slate-900'
              }`
            }
          >
            <span>My Registrations</span>
            {registrations.length > 0 && (
              <span className="px-1.5 py-0.5 text-xs font-bold bg-indigo-100 text-indigo-700 rounded-full">
                {registrations.length}
              </span>
            )}
            {isRegistrationsActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </NavLink>

          <NavLink
            to="/dashboard"
            id="nav-tab-dashboard"
            className={({ isActive }) =>
              `h-full flex items-center text-sm font-semibold relative transition-colors px-1 ${
                isActive || isDashboardActive ? 'text-indigo-700' : 'text-slate-600 hover:text-slate-900'
              }`
            }
          >
            <span>Dashboard</span>
            {isDashboardActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </NavLink>
        </nav>

        {/* Right: Auth & Profile */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-semibold text-slate-800 leading-tight">{user.name}</span>
                <span className="text-xs text-slate-500">{user.email}</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold text-sm flex items-center justify-center shadow-xs">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button
                id="btn-logout"
                onClick={handleLogout}
                className="text-xs font-medium text-slate-500 hover:text-rose-600 transition-colors ml-1 px-2 py-1 rounded hover:bg-slate-100 cursor-pointer"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <button
                id="btn-login"
                onClick={() => openAuthModal('login')}
                className="text-sm font-semibold text-slate-700 hover:text-indigo-600 px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Log in
              </button>
              <button
                id="btn-signup"
                onClick={() => openAuthModal('signup')}
                className="text-sm font-semibold text-white bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 px-5 py-2.5 rounded-lg transition-all shadow-sm shadow-indigo-200 hover:shadow cursor-pointer"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden border-t border-slate-100 px-4 py-2 bg-white justify-around text-xs font-medium">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `py-1.5 px-3 rounded-md ${
              isActive || (isBrowseActive && !isDashboardActive)
                ? 'text-indigo-700 bg-indigo-50 font-bold'
                : 'text-slate-600'
            }`
          }
        >
          Browse
        </NavLink>
        <NavLink
          to="/registrations"
          className={({ isActive }) =>
            `py-1.5 px-3 rounded-md flex items-center gap-1.5 ${
              isActive ? 'text-indigo-700 bg-indigo-50 font-bold' : 'text-slate-600'
            }`
          }
        >
          <span>My Registrations</span>
          {registrations.length > 0 && (
            <span className="w-4 h-4 text-[10px] bg-indigo-600 text-white rounded-full flex items-center justify-center">
              {registrations.length}
            </span>
          )}
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `py-1.5 px-3 rounded-md ${
              isActive || isDashboardActive ? 'text-indigo-700 bg-indigo-50 font-bold' : 'text-slate-600'
            }`
          }
        >
          Dashboard
        </NavLink>
      </div>
    </header>
  );
};