import React from 'react'
import { useChatStore } from '../store/useChatStore'

export const ChatMessage = () => {

  const {messages} = useChatStore();

  if(!messages){
    return <div>No chats to display</div>
  }

  console.log('retrived in chatMessage comp')
  return (
    <div>{
       <div>HI-{messages}</div>
      }</div>
  )
}
