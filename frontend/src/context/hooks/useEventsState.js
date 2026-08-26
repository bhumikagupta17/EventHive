import { useState,useCallback,useEffect } from "react";
import api from "../../api/client.js"

export function useEventsState({showToast}){

    const[events,setEvents]=useState([])
    const refreshEvents=useCallback(async()=>{
        const {data}=await api.get('/events')
        setEvents(data.map((e)=>({...e,id:e._id})))
    },[])
    useEffect(()=>{refreshEvents()},[refreshEvents])

    const toggleBookmark=(eventId,e)=>{
        if(e){
            e.preventDefault()
            e.stopPropagation()
        }
        setEvents((prev)=>{
            prev.map((e)=>{
                if(e.id===eventId){
                    const next=!e.bookmarked
                    showToast(next ? `Saved "${ev.title}" to bookmarks` : `Removed "${ev.title}" from bookmarks`);
                    return { ...ev, bookmarked: next };
                }
                return e
            })
        })
    }
    const createEvent = async (newEvent) => {
    try {
      await api.post('/events', {
        title: newEvent.title,
        description: newEvent.description,
        category: newEvent.category,
        location: newEvent.location,
        date: newEvent.startDate || new Date().toISOString(),
        dateDisplay: newEvent.dateDisplay,
        bannerUrl: newEvent.bannerUrl,
        price: newEvent.price,
        isFree: newEvent.price === 'Free',
        organizerName: newEvent.organizer?.name,
        organizerEmail: newEvent.organizer?.contactEmail,
      })
      await refreshEvents();
      showToast(`Created new campus event "${newEvent.title}"!`)
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to create event')
    }
  }
    const updateEvent=async(updatedEvent)=>{
        try {
            await api.put(`/events/${updatedEvent.id}`,updatedEvent)
            await refreshEvents()
            showToast(`Updated event "${updatedEvent.title}"!`)
        } catch (err) {
            showToast(err.response?.data?.message || 'Failed to update event')
            throw err
        }
    }
    const deleteEvent=async(eventId)=>{
        const ev = events.find((e) => e.id === eventId)
        if (!ev || !window.confirm(`Are you sure you want to delete "${ev.title}"?`)) return
        try {
            await api.delete('/events/${eventId}')
            await refreshEvents()
            showToast("Event deleted Succesfully")
        } catch (err) {
            showToast(err.response?.data?.message || "Failed to delete event")
        }
    }
    const fetchAttendees = async (eventId) => {
        const { data } = await api.get(`/events/${eventId}/attendees`)
        setEvents((prev) => prev.map((ev) => (ev.id === eventId ? { ...ev, attendeesList: data } : ev)))
        return data;
    }
    const toggleCheckIn = async (eventId, attendeeId) => {
    try {
      const { data } = await api.patch(`/registrations/${attendeeId}/checkin`)
      showToast(data.status === 'Checked In' ? 'Checked in!' : 'Marked as pending.')
      await fetchAttendees(eventId)
    } catch (err) {
      showToast(err.response?.data?.message || 'Check-in failed')
    }
  }
  const addGuest = (eventId, guest) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          const currentList = ev.attendeesList || [];
          return { ...ev, attendeesCount: (ev.attendeesCount || 0) + 1, attendeesList: [guest, ...currentList] };
        }
        return ev
      })
    )
    showToast(`Added ${guest.name} to roster (local only — not a registered account).`)
  }

  return {
    events, setEvents, refreshEvents, toggleBookmark,
    createEvent, updateEvent, deleteEvent,
    fetchAttendees, toggleCheckIn, addGuest,
  };
}