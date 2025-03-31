import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { Settings } from 'lucide-react'

export const Navbar = () => {

  const {logout, authUser} = useAuthStore()
  const doLogout = () => {
    logout()
  }

  //sm:h-10 md:h-10 h-12
  return (
    <div className='flex justify-between fixed top-0 w-full z-[9999] bg-slate-50 text-black'>
       <div>
       <p>welcome <span className='font-bold'>{authUser?.fullname}</span></p>
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
        <button className='bg-white text-black' onClick={doLogout}>Logout</button>
       </div>
       </div>
    </div>
  )
}
