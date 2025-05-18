import React from 'react'
import { useChatStore } from '../../store/useChatStore'

import { ChatContainer } from './ChatContainer'
import { Sidebar } from '../Sidebar'

export const ChatPage = () => {
  console.log("chatPage rendered")
  const {selectedUser} = useChatStore()

  return (
   <div className="homeChat">
         <div className={`sidebar ${selectedUser ? "sidebar-visiblity" : "block"} `}>   
         <Sidebar/>
         </div>
         {selectedUser && 
         <div className='chatContainer overflow-x-hidden'><ChatContainer/></div>}
      </div>   
  )
}
