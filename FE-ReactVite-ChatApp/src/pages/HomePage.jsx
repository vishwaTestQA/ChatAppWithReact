import React, { useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';
import { ProfilePage } from './ProfilePage';
import { Cross, Settings } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { useChatStore } from '../store/useChatStore';
import defaultImage from '../img/default.jpg'
import { Sidebar } from '../components/Sidebar';
import { ChatContainer } from '../components/ChatContainer';
import { shallow } from 'zustand/shallow';

export const HomePage = () => {
  // const user = useLocation().state.user ?? 'guest';

  const { 
    users,
    getUsers,
    // isUsersLoading,
    // isMessagesLoading, 
    selectedUser} = useChatStore()

// const {users, getUsers,selectedUser} = useChatStore(state => ({
//    users: state.users,
//    getUsers: state.getUsers,
//   //  isUsersLoading: state.isUsersLoading,
//   //  isMessagesLoading: state.isMessagesLoading,
//    selectedUser: state.selectedUser
// }),
// shallow
// )

console.log('users in Homepage', users)
  useEffect(()=>{
    if(users?.length === 0){    //this is to ensure not refetching when we visit again 
                                           //this page
      getUsers()
    }
  },[getUsers])

    // const memoizedUsers = useMemo(()=> users, [users]) 
    // const memoizedSelectedUser = useMemo(()=> selectedUser, [selectedUser]) 


    // const memoizedSidebar = useMemo(()=>{
    //   if(!memoizedUsers) return null
    //   return <Sidebar/>
    // },[memoizedUsers, isUsersLoading])

  // const memoizedChatContainer = useMemo(()=>{
  //   if(!selectedUser) return null
  //   return isMessagesLoading 
  //   ? (<div className='animate-pulse size-4'></div>)
  //   : (<ChatContainer/>)
  // },[memoizedSelectedUser, isMessagesLoading])

  return (
       <section className='homeChat w-full'>
       {/* {memoizedSidebar} */}
       {/* {memoizedChatContainer} */}

       <Sidebar className='sidebar'/>
       {selectedUser && <ChatContainer/>}
       {/* <header className='chatHeader flex items-center justify-around'>
      <div className='flex flex-col w-full'>
        <p>{selectedUser?.fullname}</p>
        <p>active</p>
      </div>
      <div>
        <Cross className='size-4'></Cross>
      </div>
    </header> */}
       </section>
  )
}
