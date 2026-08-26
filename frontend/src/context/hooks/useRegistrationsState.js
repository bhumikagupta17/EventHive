import { useState } from 'react';
import api from '../../api/client';

export function useRegistrationsState({user,showToast,refreshEvents}){
        const [registrations, setRegistrations] = useState([])
        
        const refreshMyRegistrations=useCallback(async()=>{
        if(!user || user.role!=='student') return
        try {
            const {data}=await api.get('/registrations/me')
            setRegistrations(data.map((r)=>({
                id: r._id,
                eventId: r.event?._id,
                eventTitle: r.event?.title,
                eventDate: r.event?.dateDisplay,
                eventLocation: r.event?.location,
                bannerUrl: r.event?.bannerUrl,
                ticketType: r.ticketType,
                status: r.status,
                registeredAt: r.createdAt,
            })))
        } catch (error) {
            showToast(err.response?.data?.message || 'Failed to fetch registrations')
        }
    },[user])

    useEffect(()=>{
        refreshMyRegistrations()
    },[refreshMyRegistrations])

    const confirmRegistration = async (newReg) => {
    try {
      await api.post('/registrations', { eventId: newReg.eventId, ticketType: newReg.ticketType });
      await refreshMyRegistrations();
      await refreshEvents();
      showToast(`Successfully registered for ${newReg.eventTitle}!`);
    } catch (err) {
      showToast(err.response?.data?.message || 'Registration failed');
    }
  };

  const cancelRegistration=async(registrationId)=>{
    const target=registrations.find((r)=>r.id===registrationId)
        try {
            await api.delete(`/registrations/${registrationId}`)
            await refreshMyRegistrations()
            await refreshEvents()
            if (target) showToast(`Registration for ${target.eventTitle}cancelled`)

        } catch (err) {
            showToast(err.response?.data?.message || 'Failed to cancel registration')
        }
    }
    return{cancelRegistration,registrations,setRegistrations,refreshMyRegistrations,confirmRegistration}
}