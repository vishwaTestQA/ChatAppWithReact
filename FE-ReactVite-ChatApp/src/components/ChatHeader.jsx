import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { Cross } from 'lucide-react';

const ChatHeader = () => {
  const {selectedUser} = useChatStore();

  return (
    <header className='flex items-center justify-around'>
      <div className='flex flex-col w-full'>
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