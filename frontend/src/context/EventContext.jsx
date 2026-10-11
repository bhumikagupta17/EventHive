import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { useToastState } from './hooks/useToastState';
import { useModalState } from './hooks/useModalsState';
import { useAuthState } from './hooks/useAuthState';
import { useEventsState } from './hooks/useEventsState';
import { useRegistrationsState } from './hooks/useRegistrationsState';

const EventContext = createContext(undefined);

export const EventProvider = ({ children }) => {
  const toast = useToastState();
  const modals = useModalState();
  const eventsState = useEventsState({ showToast: toast.showToast });
  const auth = useAuthState({
    showToast: toast.showToast,
    refreshEvents: eventsState.refreshEvents,
    closeAuthModal: modals.closeAuthModal,
  });
  const registrationsState = useRegistrationsState({
    user: auth.user,
    showToast: toast.showToast,
    refreshEvents: eventsState.refreshEvents,
  });

  // Stable logout that clears registrations alongside auth state
  const logout = useCallback(
    () => auth.logout(() => registrationsState.setRegistrations([])),
    [auth.logout, registrationsState.setRegistrations]
  );

  // Memoize the context value so consumers only re-render when
  // something in the composed state actually changes
  const contextValue = useMemo(
    () => ({
      ...toast,
      ...modals,
      ...eventsState,
      ...auth,
      ...registrationsState,
      logout, // overrides auth.logout with the version that also clears registrations
    }),
    [toast, modals, eventsState, auth, registrationsState, logout]
  );

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error('useEvents must be used within an EventProvider');
  return context;
};