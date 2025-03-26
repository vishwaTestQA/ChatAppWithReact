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
  // 
  return (
    <div>
      <aside className='p-2'>
        <div>{
            users.map(user => (
                <div key={user._id} 
                className={`flex w-24 h-20 items-center gap-3
                  ${selectedUser?._id === user._id? "bg-base-200 ring-1 ring-base-300" : ""}
                  `}
                    onClick={()=>
                      {
                      if(selectedUser?._id !== user._id){
                      setSelectedUser(user)
                      }
                      }}>
                    <div className='w-[30%]'>
                    <img src={user?.profilePic?.url || defaultImage} className='w-full h-auto rounded-full object-cover'/>
                    </div>
                    <div className='flex flex-col'>
                    <p>{user.fullname}</p>
                    <p>active</p>
                    </div>
                </div>
            ))
          }</div>
       </aside>
    </div>
  )
}
