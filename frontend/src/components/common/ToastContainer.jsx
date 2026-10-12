import React from 'react';
import { useEvents } from '../../context/EventContext';
import { Toast } from './Toast.jsx';

export const ToastContainer = () => {
  const { toastMessage } = useEvents();
  return <Toast message={toastMessage} />;
};