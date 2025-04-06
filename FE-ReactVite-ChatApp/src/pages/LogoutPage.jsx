import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { LogOut } from 'lucide-react'

export const LogoutPage = () => {

  const {logout} = useAuthStore()
  
  return (
   <button onClick={logout}><LogOut></LogOut></button>
  )
}
