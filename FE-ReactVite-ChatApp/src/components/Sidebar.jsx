import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import defaultImage from '../img/default.jpg'
import { useAuthStore } from '../store/useAuthStore'

export const Sidebar = () => {
  const {users, isUsersLoading, setSelectedUser, selectedUser} = useChatStore()
  // const {authUser} = useAuthStore()
  // const [selectedUser, setSelectedUser] = useState(null);

  // useEffect(() => {
  //   console.log('sidebar useffect 1')
  //   getUsers()
  // },[getUsers])

  console.log('in sidebar', users)

  if(isUsersLoading){
    return <div>Loading...</div>
  }
  // scroll-m-10  max-h-screen overflow-y-auto
  return (
        <aside className='sidebar flex flex-wrap overflow-y-auto overflow-x-hidden max-h-screen'>{
            users.map(user => (
                <div                         //each user list in sidebar
                  key={user._id} 
                  className={`flex w-full h-16 items-center gap-2
                  ${selectedUser?._id === user._id ? "bg-base-200 ring-1 ring-base-300" : ""}
                  `}
                   onClick={()=>
                      // {
                      // if(selectedUser?._id !== user._id){
                   setSelectedUser(user)
                      // }
                      // }
                }>
                    <div className='w-8 h-8'>
                    <img src={user?.profilePic?.url || defaultImage} className='  rounded-full object-contain w-full flex-shrink-0'/>
                    </div>
                    {/* text-[clamp(14px,2vw,24px)] */}
                    <div className='flex flex-col truncate'>
                    <p className='truncate'>{user.fullname}</p>
                    <p className='truncate'>active</p>
                    {/* truncate */}
                    </div>
                </div>
            ))
          }</aside>
  )
}
