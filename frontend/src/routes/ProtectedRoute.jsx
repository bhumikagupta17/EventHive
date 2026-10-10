import { Navigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

export const ProtectedRoute = ({ children, requireOrganizer = false }) => {
  const { user } = useEvents();

  if (!user) {
    // not logged in → back to browse
    return <Navigate to="/" replace />;
  }

  if (requireOrganizer && user.role !== 'organizer') {
    // logged in but not an organizer → back to browse
    return <Navigate to="/" replace />;
  }

  return children;
};