import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';
import { ProfilePage } from './ProfilePage';
import { Settings } from 'lucide-react';

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
       
        <Link to='/settings'> <Settings className='size-4'/></Link>
       </div>

       <div>
       
       <Link to='/customSettings'> custom <Settings className='size-6 inline-block'/></Link>
      </div>
       <div>
        <button className='bg-white' onClick={doLogout}>Logout</button>
       </div>
    </div>
  )
}
