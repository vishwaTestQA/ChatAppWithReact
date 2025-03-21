import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';
import { ProfilePage } from './ProfilePage';

export const HomePage = () => {
  // const user = useLocation().state.user ?? 'guest';

  const {logout} = useAuthStore()
  const doLogout = () => {
    logout()
  }
  return (
    <div>
       <p>welcome</p>
       <div>
        <Link to='/profilePage'>profilePage</Link>
       </div>
       <div>
        <button className='bg-white' onClick={doLogout}>Logout</button>
       </div>
    </div>
  )
}
