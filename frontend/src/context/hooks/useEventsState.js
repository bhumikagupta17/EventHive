import { useState, useCallback, useEffect } from "react";
import api from "../../api/client.js"

const BOOKMARKS_KEY = 'eventhive_bookmarks'

function loadBookmarks() {
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY)
    return stored ? new Set(JSON.parse(stored)) : new Set()
  } catch {
    return new Set()
  }
}

function saveBookmarks(bookmarkedIds) {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([...bookmarkedIds]))
  } catch {
    // localStorage can be unavailable in some browsers — fail silently
  }
}

export function useEventsState({ showToast }) {
  const [events, setEvents] = useState([])

  const refreshEvents = useCallback(async () => {
    try {
      const { data } = await api.get('/events')
      // restore bookmarks from localStorage so they survive page refresh
      const bookmarked = loadBookmarks()
      setEvents(data.map((e) => ({ ...e, id: e._id, bookmarked: bookmarked.has(e._id) })))
    } catch (err) {
      console.error("[refreshEvents]", err)
      showToast('Failed to load events')
    }
  }, [showToast])

  useEffect(() => { refreshEvents() }, [refreshEvents])

  const toggleBookmark = (eventId, e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setEvents((prev) => {
      const next = prev.map((ev) => {
        if (ev.id !== eventId) return ev
        const nextBookmarked = !ev.bookmarked
        showToast(nextBookmarked ? `Saved "${ev.title}" to bookmarks` : `Removed "${ev.title}" from bookmarks`)
        return { ...ev, bookmarked: nextBookmarked }
      })
      // persist updated bookmark set to localStorage
      const bookmarkedIds = new Set(next.filter((ev) => ev.bookmarked).map((ev) => ev.id))
      saveBookmarks(bookmarkedIds)
      return next
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
      await refreshEvents()
      showToast(`Created new campus event "${newEvent.title}"!`)
    } catch (err) {
      console.error("[createEvent]", err)
      showToast(err.response?.data?.message || 'Failed to create event')
    }
  }

  const updateEvent = async (updatedEvent) => {
    try {
      await api.put(`/events/${updatedEvent.id}`, updatedEvent)
      await refreshEvents()
      showToast(`Updated event "${updatedEvent.title}"!`)
    } catch (err) {
      console.error("[updateEvent]", err)
      showToast(err.response?.data?.message || 'Failed to update event')
      throw err
    }
  }

  const deleteEvent = async (eventId) => {
    const ev = events.find((e) => e.id === eventId)
    if (!ev || !window.confirm(`Are you sure you want to delete "${ev.title}"?`)) return
    try {
      await api.delete(`/events/${eventId}`)
      await refreshEvents()
      showToast('Event deleted successfully')
    } catch (err) {
      console.error("[deleteEvent]", err)
      showToast(err.response?.data?.message || 'Failed to delete event')
    }
  }

  const fetchAttendees = async (eventId) => {
    try {
      const { data } = await api.get(`/events/${eventId}/attendees`)
      setEvents((prev) => prev.map((ev) => (ev.id === eventId ? { ...ev, attendeesList: data } : ev)))
      return data
    } catch (err) {
      console.error("[fetchAttendees]", err)
      showToast('Failed to load attendees')
    }
  }

  const toggleCheckIn = async (eventId, attendeeId) => {
    try {
      const { data } = await api.patch(`/registrations/${attendeeId}/checkin`)
      showToast(data.status === 'Checked In' ? 'Checked in!' : 'Marked as pending.')
      await fetchAttendees(eventId)
    } catch (err) {
      console.error("[toggleCheckIn]", err)
      showToast(err.response?.data?.message || 'Check-in failed')
    }
  }

  const addGuest = (eventId, guest) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== eventId) return ev
        const currentList = ev.attendeesList || []
        return { ...ev, attendeesCount: (ev.attendeesCount || 0) + 1, attendeesList: [guest, ...currentList] }
      })
    )
    showToast(`Added ${guest.name} to roster (local only — not a registered account).`)
  }

  return {
    events, setEvents, refreshEvents, toggleBookmark,
    createEvent, updateEvent, deleteEvent,
    fetchAttendees, toggleCheckIn, addGuest,
  }
}