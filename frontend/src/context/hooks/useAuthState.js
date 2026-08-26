import { useState } from 'react';
import api from '../../api/client';

export function useAuthState({ showToast, refreshEvents, closeAuthModal }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('eventhive_user');
    return stored ? JSON.parse(stored) : null;
  })

  const authAction=async({mode,name,email,password,role})=>{
    try {
      const endpoint = mode === 'signup' ? '/auth/signup' : '/auth/login';
      const payload = mode === 'signup' ? { name, email, password, role } : { email, password };
      const { data } = await api.post(endpoint, payload);
      localStorage.setItem('eventhive_token', data.token);
      localStorage.setItem('eventhive_user', JSON.stringify(data.user));
      setUser(data.user);
      closeAuthModal();
      showToast(`Welcome${mode === 'signup' ? '' : ' back'}, ${data.user.name}!`);
      refreshEvents();
    } catch (err) {
      showToast(err.response?.data?.message || 'Authentication failed');
    }
  }
  const logout=(onLoggedOut)=>{
        localStorage.removeItem('eventhive_token')
        localStorage.removeItem('eventhive_user')
        setUser(null)
        onLoggedOut?.()
        showToast('Logged Out')
    }
    return{user,authAction,logout}
}