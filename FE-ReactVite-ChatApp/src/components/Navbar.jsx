import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { Settings } from 'lucide-react'

export const Navbar = () => {

  const {logout} = useAuthStore()
  const doLogout = () => {
    logout()
  }

  return (
    <div className='flex justify-between sticky top-0 left-0 right-0 h-10 sm:h-12 md:h-14 z-50'>
       <div>
       <p>welcome</p>
       </div>

       <div className='flex justify-around gap-3'>
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
    </div>
  )
}
