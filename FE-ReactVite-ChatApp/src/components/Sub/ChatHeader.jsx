import React from 'react'
import { useChatStore } from '../../store/useChatStore';

export const ChatHeader = () => {
    const {selectedUser} = useChatStore();
    
  return (
      <header
        className={`chatHeader flex items-center justify-between w-full fixed top-0 md:sticky md:top-6 md:flex-1`}
      >
        <div className="flex flex-col">
          <p>{selectedUser?.fullname}</p>
          <p>active</p>
        </div>
        <button onClick={handleCloseUser}>X</button>
      </header>
  )
}
