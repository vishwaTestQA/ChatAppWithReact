import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

export const LogoutPage = () => {

  const {logout} = useAuthStore()
  
  return (
    <div>LogoutPage</div>
  )
}
