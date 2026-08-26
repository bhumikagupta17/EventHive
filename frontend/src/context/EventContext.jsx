import React,{useCallback,useState,useContext,createContext,useEffectEvent, useEffect} from "react";
import api from "../api/client.js"
import { useAuth } from "./AuthContext.jsx";
import { useToast } from "./ToastContext.jsx";

const EventContext=createContext(null)

export const EventProvider=({children})=>{
    const {user}=useAuth()
    const {showToast}=useToast()

    const [events, setEvents] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [loading,setLoading]=useState(true)

    const refreshEvents=useCallback(async(params={})=>{
        try{
            setLoading(true)
            const {data}=await api.get('/events',{params})
            setEvents(data.events || data)
        }catch(err){
            showToast(err.response?.data?.message || 'Failed to fetch events')
        }finally{
            setLoading(false)
        }
    },[showToast])

    const refreshMyRegistrations=useCallback(async()=>{
        if(!user || user.role!=='student'){
            setRegistrations([])
            return
        }
        try {
            const {data}=await api.get('/registrations/me')
            setRegistrations(data)
        } catch (error) {
            showToast(err.response?.data?.message || 'Failed to fetch registrations')
        }
    },[user,showToast])

    useEffect(()=>{
        refreshEvents()
    },[refreshEvents])

    useEffect(()=>{
        refreshMyRegistrations()
    },[refreshMyRegistrations])

    const registerForEvent=async(eventId)=>{
        try{
            await api.post('/registrations',{eventId})
            await Promise.all([refreshMyRegistrations(),refreshEvents()])
            showToast('Succesfully registered for event! ')
        }catch(err){
            showToast(err.response?.data?.message || 'Registration failed')
            throw err
        }
    }

    const cancelRegistration=async(registrationId)=>{
        try {
            await api.delete(`/registrations/${registrationId}`)
            await Promise.all(refreshMyRegistrations(),refreshEvents())
            showToast("Registration cancelled")

        } catch (err) {
            showToast(err.response?.data?.message || 'Failed to cancel registration')
            throw err
        }
    }

    const createEvent=async(eventData)=>{
        try {
            const {data}=await api.post('/events',eventData)
            await refreshEvents()
            showToast(`Created event "${data.title}"!`)
            return data
        } catch (err) {
            showToast(err.response?.data?.message || 'Failed to create event')
            throw err
        }
    }

    const updateEvent=async(eventId,updatedData)=>{
        try {
            const {data}=await api.post('/events/${eventId}',updatedData)
            await refreshEvents()
            showToast(`Updated event "${data.title}"!`)
            return data
        } catch (err) {
            showToast(err.response?.data?.message || 'Failed to update event')
            throw err
        }
    }

    const deleteEvent=async(eventId)=>{
        try {
            await api.delete('/events/${eventId}')
            await refreshEvents()
            showToast("Event deleted Succesfully")
        } catch (err) {
            showToast(err.response?.data?.message || "Failed to delete event")
        }
    }

    const toggleCheckIn=async(registrationId)=>{
        try {
            const {data}=await api.patch('/registrations/${registrationId}/checkin')
            showToast('Check-in status updated!')
            return data
        } catch (err) {
            showToast(err.response?.data?.message || "Check-in failed")
        }
    }

    return(
        <EventContext.Provider
        value={{
            events,registrations,loading,refreshEvents,refreshMyRegistrations,
            registerForEvent,cancelRegistration,createEvent,deleteEvent,updateEvent,toggleCheckIn
        }}>
            {children}
        </EventContext.Provider>
    )
}

export const useEvents=()=>{
    const context=useContext(EventContext)
    if(!context) {
        throw new Error('useEvents must be used within an EventProvider')
    }
    return context
}