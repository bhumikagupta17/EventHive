import React,{createContext,useContext,useState,useCallback} from "react";

const ToastContext=createContext(null)

export const ToastProvider=({children})=>{
    const [toastMessage,setToastMessage]=useState(null)

    const showToast=useCallback((msg)=>{
        setToastMessage(msg)
        setTimeout(()=>setToastMessage(null),3000)
    },[])

    return(
        <ToastContext.Provider value={{toastMessage,showToast}}>
            {children}
            {toastMessage && (
                <div className="fixed bottom-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-lg border border-border text-sm animate-fade-in">
                    {toastMessage}
                </div>
            )}
        </ToastContext.Provider>
    )
}

export const useToast=()=>{
    const context=useContext(ToastContext)
    if(!context) throw new Error("useToast must be used within a ToastProvider")
    return context
}