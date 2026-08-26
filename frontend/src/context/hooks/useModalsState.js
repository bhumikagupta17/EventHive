import { useState } from 'react';

// Every modal's open/closed state and its open/close helpers.
// Pure UI state — no API calls live here.
export function useModalsState() {
  const [registerModalEvent, setRegisterModalEvent] = useState(null);
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [addGuestModalEventId, setAddGuestModalEventId] = useState(null);
  const [mapModalData, setMapModalData] = useState({ open: false, location: '', detail: '' });
  const [contactOrganizerData, setContactOrganizerData] = useState(null);
  const [reportModalEvent, setReportModalEvent] = useState(null);
  const [draftModalEvent, setDraftModalEvent] = useState(null);
  const [authModalData, setAuthModalData] = useState({ open: false, mode: 'login' });
  const [infoModalType, setInfoModalType] = useState(null);

  const openRegisterModal = (event, e) => { if (e) { e.preventDefault(); e.stopPropagation(); } setRegisterModalEvent(event); };
  const closeRegisterModal = () => setRegisterModalEvent(null);
  const openCreateEventModal = () => setCreateEventModalOpen(true);
  const closeCreateEventModal = () => setCreateEventModalOpen(false);
  const openAddGuestModal = (eventId) => setAddGuestModalEventId(eventId);
  const closeAddGuestModal = () => setAddGuestModalEventId(null);
  const openMapModal = (location, detail) => setMapModalData({ open: true, location, detail });
  const closeMapModal = () => setMapModalData((prev) => ({ ...prev, open: false }));
  const openContactModal = (organizer) => setContactOrganizerData(organizer);
  const closeContactModal = () => setContactOrganizerData(null);
  const openReportModal = (event) => setReportModalEvent(event);
  const closeReportModal = () => setReportModalEvent(null);
  const openDraftModal = (event) => setDraftModalEvent(event);
  const closeDraftModal = () => setDraftModalEvent(null);
  const openAuthModal = (mode) => setAuthModalData({ open: true, mode });
  const closeAuthModal = () => setAuthModalData((prev) => ({ ...prev, open: false }));
  const openInfoModal = (type) => setInfoModalType(type);
  const closeInfoModal = () => setInfoModalType(null);

  return {
    registerModalEvent, openRegisterModal, closeRegisterModal,
    createEventModalOpen, openCreateEventModal, closeCreateEventModal,
    addGuestModalEventId, openAddGuestModal, closeAddGuestModal,
    mapModalData, openMapModal, closeMapModal,
    contactOrganizerData, openContactModal, closeContactModal,
    reportModalEvent, openReportModal, closeReportModal,
    draftModalEvent, openDraftModal, closeDraftModal,
    authModalData, openAuthModal, closeAuthModal,
    infoModalType, openInfoModal, closeInfoModal,
  };
}
