import React from 'react';
import { useEvents } from '../../context/EventContext.jsx';
import { RegisterModal } from './RegisterModal.jsx';
import { CreateEventModal } from './CreateEventModal.jsx';
import { AddGuestModal } from './AddGuestModal.jsx';
import { MapModal } from './MapModal.jsx';
import { ContactModal } from './ContactModal.jsx';
import { EventReportModal } from './EventReportModal.jsx';
import { EditDraftModal } from './EditDraftModal.jsx';
import { AuthModal } from './AuthModal.jsx';
import { InfoModal } from './InfoModal.jsx';

export const GlobalModals = () => {
  const {
    user,
    authAction,
    showToast,
    confirmRegistration,
    createEvent,
    addGuest,
    updateEvent,

    registerModalEvent,
    closeRegisterModal,

    createEventModalOpen,
    closeCreateEventModal,

    addGuestModalEventId,
    closeAddGuestModal,

    mapModalData,
    closeMapModal,

    contactOrganizerData,
    closeContactModal,

    reportModalEvent,
    closeReportModal,

    draftModalEvent,
    closeDraftModal,

    authModalData,
    closeAuthModal,

    infoModalType,
    closeInfoModal
  } = useEvents();

  return (
    <>
      {/* Register Modal */}
      {registerModalEvent && (
        <RegisterModal
          event={registerModalEvent}
          isOpen={Boolean(registerModalEvent)}
          onClose={closeRegisterModal}
          onConfirmRegistration={confirmRegistration}
          initialUser={user}
        />
      )}

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={createEventModalOpen}
        onClose={closeCreateEventModal}
        onCreateEvent={createEvent}
      />

      {/* Add Guest Modal */}
      {addGuestModalEventId && (
        <AddGuestModal
          isOpen={Boolean(addGuestModalEventId)}
          onClose={closeAddGuestModal}
          onAddGuest={guest => addGuest(addGuestModalEventId, guest)}
        />
      )}

      {/* Campus Map Modal */}
      <MapModal
        isOpen={mapModalData.open}
        onClose={closeMapModal}
        locationName={mapModalData.location}
        detailName={mapModalData.detail}
      />

      {/* Contact Host Modal */}
      <ContactModal
        isOpen={Boolean(contactOrganizerData)}
        onClose={closeContactModal}
        organizer={contactOrganizerData}
      />

      {/* Event Report Modal */}
      {reportModalEvent && (
        <EventReportModal
          isOpen={Boolean(reportModalEvent)}
          onClose={closeReportModal}
          event={reportModalEvent}
        />
      )}

      {/* Edit Draft Modal */}
      {draftModalEvent && (
        <EditDraftModal
          isOpen={Boolean(draftModalEvent)}
          onClose={closeDraftModal}
          event={draftModalEvent}
          onSaveDraft={updateEvent}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalData.open}
        initialMode={authModalData.mode}
        onClose={closeAuthModal}
        onSubmit={authAction}
      />

      {/* Info Modal */}
      <InfoModal
        type={infoModalType}
        onClose={closeInfoModal}
      />
    </>
  );
};