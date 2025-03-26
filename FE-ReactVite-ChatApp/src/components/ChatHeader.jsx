import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { Cross } from 'lucide-react';

const ChatHeader = () => {
  const {selectedUser} = useChatStore();

  return (
    <div className='flex items-center justify-around'>
      <div className='flex flex-col'>
        <p>{selectedUser?.fullname}</p>
        <p>active</p>
      </div>
      <div>
        <Cross className='size-4'></Cross>
      </div>
    </div>
  )
}

export default ChatHeader