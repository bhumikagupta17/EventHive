import React,{createContext,useContext} from "react"
import {useToastState} from "./hooks/useToastState"
import {useModalState} from "./hooks/useModalsState"
import { useAuthState } from './hooks/useAuthState';
import { useEventsState } from './hooks/useEventsState';
import { useRegistrationsState } from './hooks/useRegistrationsState';

const EventContext=createContext(undefined)

export const EventProvider=({children})=>{
    const toast = useToastState();
    const modals = useModalsState();
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

    const logout = () => auth.logout(() => registrationsState.setRegistrations([]))

    return (
        <EventContext.Provider
        value={{
            ...toast,
            ...modals,
            ...eventsState,
            ...auth,
            ...registrationsState,
            logout, // overrides auth.logout with the version that also clears registrations
        }}
        >
        {children}
        </EventContext.Provider>
    )
}

export const useEvents=()=>{
    const context=useContext(EventContext)
    if(!context) throw new Error('useEvents must be used within an EventProvider')
    return context
}