import React from 'react'
import { useChatStore } from '../store/useChatStore'

export const ChatMessage = () => {

  const {messages} = useChatStore();

  console.log(messages)
  if(messages.length===0){
    return <div>No chats to display</div>
  }

  console.log('retrived in chatMessage comp')
  return (
       <div className='overflow-y-auto'>HI-{messages}</div>
  )
}
