import React from 'react'
import { useChatStore } from '../../store/useChatStore';

export const ChatHeader = ({className=''}) => {
    const {selectedUser, setSelectedUser} = useChatStore();
    
    const handleCloseUser = () => {
      setSelectedUser(null);
    };

  return (
      <header
        className={`chatHeader flex items-center justify-between p-3 ${className}`}
      >
        <div className="flex flex-col">
          <p>{selectedUser?.fullname}</p>
          <p>active</p>
        </div>
        <button onClick={handleCloseUser}>X</button>
      </header>
  )
}
