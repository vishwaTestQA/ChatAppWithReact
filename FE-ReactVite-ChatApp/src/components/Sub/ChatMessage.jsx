import React, { useEffect, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";

export const ChatMessage = () => {
   const {messages, selectedUser} = useChatStore();
    const msgRef = useRef(null)
  
    useEffect(()=>{
      if(msgRef.current){
        msgRef.current.scrollIntoView({behaviour: "smooth"})
      }
    },[messages])
  
    if(messages.length === 0){
      return <div>No chats to display</div>
    }

  return (
    <main
      className={`chatMessage max-h-[calc(100vh-80px)] w-[100%] overflow-y-auto  p-t-6 block`}
      >
      <ul className="flex flex-col">
        {messages.map((msg, indx) => (
          <li
            key={indx}
            ref={indx === messages.length - 1 ? msgRef : null}
            className={`list-none max-w-[80%] mb-1 pr-2 pl-2 pb-1 pt-1 min-w-5 h-auto break-words
               ${
                 msg._id !== selectedUser._id
                   ? "bg-slate-900 self-end"
                   : "bg-slate-600 self-start"
               }`}
          >
            {msg.text && <div>{msg.text}</div>}
            {msg.image && <img src={msg.image}></img>}
          </li>
        ))}
      </ul>
    </main>
  );
};
