import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { GlobalModals } from './components/modals/GlobalModals';
import { ProtectedRoute } from './routes/ProtectedRoute';
// Pages from the pages directory
import {
  BrowsePage,
  EventDetailPage,
  DashboardPage,
  AttendeeManagementPage,
  MyRegistrationsPage,
  NotFoundPage
} from './pages';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <EventProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#fafafa] text-slate-900 selection:bg-indigo-500 selection:text-white">
          {/* Global Navbar */}
          <Navbar />

          {/* Main Routed Page Content */}
          <main className="flex-1">
            <Routes>
              {/* Screen 1: Browse Campus Events */}
              <Route path="/" element={<BrowsePage />} />
              <Route path="/events" element={<BrowsePage />} />

              {/* Screen 2: Event Details Screen */}
              <Route path="/events/:eventId" element={<EventDetailPage />} />

              {/* Screen 3: Organizer Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requireOrganizer>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Screen 4: Attendee Management Screen */}
              <Route
                  path="/events/:eventId/attendees"
                  element={
                    <ProtectedRoute requireOrganizer>
                      <AttendeeManagementPage />
                    </ProtectedRoute>
                  }
                />
              <Route
                path="/dashboard/events/:eventId/attendees"
                element={
                  <ProtectedRoute requireOrganizer>
                    <AttendeeManagementPage />
                  </ProtectedRoute>
                }
              />
              {/* Screen 5: My Registrations Screen */}
              <Route path="/registrations" element={<MyRegistrationsPage />} />

              {/* Fallback 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Global Modals & Toast System */}
          <GlobalModals />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </EventProvider>
  );
}