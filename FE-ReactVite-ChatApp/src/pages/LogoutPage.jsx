import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { LogOut } from 'lucide-react'
import { useChatStore } from '../store/useChatStore'
// import { resetAllStores } from '../lib/utils'

export const LogoutPage = () => {

  const {logout} = useAuthStore() 

  // resetAllStores();
  // resetAllStores();
  // reset();
  // localStorage.clear();
  // window.location.href = '/login';

  // useEffect(()=>{
  //   console.log('loggingout');
  // },[])
  
  return (
   <button onClick={logout}><LogOut></LogOut></button>
  )
}
