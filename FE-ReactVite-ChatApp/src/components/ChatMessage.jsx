import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import { shallow } from 'zustand/shallow';

export const ChatMessage = ({className=''}) => {

  // const {messages} = useChatStore(state => ({   //not working
  //   messages: state.messages
  // }), shallow);

  const {messages, selectedUser} = useChatStore();
  const msgRef = useRef(null)

  useEffect(()=>{
    if(msgRef.current){
      msgRef.current.scrollIntoView({behaviour: "smooth"})
    }
  },[messages])

  console.log("messages", messages)
  if(messages.length === 0){
    return <div>No chats to display</div>
  }
  
  console.log('retrived in chatMessage comp')
  return (
       <section className={`${className} max-h-[calc(100vh-80px)] 
        overflow-auto`}>
        <ul className='flex flex-col flex-wrap overflow-y-auto'>{
        messages.map((msg,indx) => (
          <li  
             key={indx} 
             ref={indx === messages.length-1 ? msgRef : null}
             className={`max-w-[80%] list-none break-words mb-3 block
               ${msg._id !== selectedUser._id ? "bg-slate-900 self-end" : "bg-slate-600 self-start"}`} 
             >
            {msg.text && <div>{msg.text}</div> }
           { msg.image && <img src={msg.image}></img>}
           </li>
        ))
        }</ul>
        </section>
  )
}
