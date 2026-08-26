import React,{createContext,useContext,useState} from "react";
import api from"../api/client.js"
import { useToast } from "./ToastContext.jsx";

const AuthContext=createContext(null)

export const AuthProvider=({children})=>{
    const {showToast}=useToast()
    const [user, setUser] = useState(()=>{
        const stored=localStorage.getItem('eventhive_user')
        return stored?JSON.parse(stored):null
    })

    const login=async (email,password)=>{
        try{
            const {data}=await api.post('/auth/login',{email,password})
            localStorage.setItem('eventhive_token',data.token)
            localStorage.setItem('eventhive_user',JSON.stringify(data.user))
            setUser(data.user)
            showToast(`Welcome back, ${data.user.name}`)
            return data.user
        }catch(err){
            const msg=err.respones?.data?.message || 'Login failed'
            showToast(msg)
            throw new Error(msg)
        }
    }

    const signup=(payload)=>{
        try{
            const {data}=api.post('/auth/signup',payload)
            localStorage.setItem('eventhive_token',data.token)
            localStorage.setItem('eventhive_user',JSON.stringify(data.user))
            setUser(data.user)
            showToast(`Welcome, ${data.user.name}`)
            return data.user
        }catch(err){
            const msg=err.response?.data?.message || 'Signup failed'
            showToast(msg)
            throw new Error(msg)
        }
    }

    const logout=()=>{
        localStorage.removeItem('eventhive_token')
        localStorage.removeItem('eventhive_user')
        setUser(null)
        showToast('Logged Out')
    }
    return(
        <AuthContext.Provider value={{user,login,signup,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    const context=useContext(AuthContext)
    if(!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}
