import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { Cross } from 'lucide-react';

const ChatHeader = ({className=""}) => {
  const {selectedUser} = useChatStore();

  return (
    <header className={`flex items-center justify-around ${className}`}>
      <div className='flex flex-col'>
        <p>{selectedUser?.fullname}</p>
        <p>active</p>
      </div>
      <div>
        <Cross className='size-4'></Cross>
      </div>
    </header>
  )
}

export default ChatHeader