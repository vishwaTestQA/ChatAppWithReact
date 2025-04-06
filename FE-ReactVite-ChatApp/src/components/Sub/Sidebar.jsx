import React from 'react'
import { useChatStore } from '../../store/useChatStore';
import defaultImage from '../../img/default.jpg'

export const Sidebar = () => {
   const { users, isUsersLoading, setSelectedUser, selectedUser } =
      useChatStore();
  
  
    if (isUsersLoading) {
      return <div>Loading...</div>;
    }

  console.log(users)
  return (
    <aside
    // className={`sidebar flex flex-wrap overflow-y-auto max-h-[calc(100vh-30px)] w-full gap-2 ${
    //   selectedUser ? "hidden md:inline-block md:w-[300px]" : "block"
    // }`}
    //  className='sidebar'
  >
      {users.map((user) => (
        <div
          key={user._id}
          className={`flex w-full h-20 items-center gap-3
              ${
                selectedUser?._id === user._id
                  ? "bg-base-200 ring-1 ring-base-300"
                  : ""
              }
              `}
          onClick={() => setSelectedUser(user)}
        >
          {/* w-12 md:w-[60px] */}
          <div className="w-12">
            <img
              src={user?.profilePic?.url || defaultImage}
              className="w-full h-auto rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col text-xl">
            <p>{user.fullname}</p>
            <p>active</p>
          </div>
        </div>
      ))}
  </aside>
  )
}
