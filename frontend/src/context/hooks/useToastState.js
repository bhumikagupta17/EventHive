import { useState } from "react";

export function useToasteState(){
     const [toastMessage,setToastMessage]=useState(null)

     const showToast=(msg)=>{
             setToastMessage(msg)
             setTimeout(()=>setToastMessage(null),3000)
    }
    return {toastMessage,showToast}
}