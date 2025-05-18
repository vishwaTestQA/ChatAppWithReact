import React, { useEffect } from 'react'
import { useChatStore } from '../../store/useChatStore';
import { ChatHeader } from './ChatHeader';
import {ChatMessage} from './ChatMessage'
import {ChatInput} from './ChatInput'
import { socket } from '../../lib/socket';

export const ChatContainer = () => {
  const {selectedUser, getMessages, isMessagesLoading} = useChatStore()

  useEffect(() => {
    // if(selectedUser?._id){
      // if(!socket.connected){
        // socket.connect();
        // socket.on('connect', () => {
        //   console.log("connected","connected")
        // })
        // socket.on('message', data => {
        //   console.log('data1234567', data)
        // })
      //  }
      getMessages(selectedUser?._id);         //backend will automatically get our userId in
                                              //in the resp (user set when verifyJWT) so messages to that chat is displyed
    // }
  }, [selectedUser?._id, getMessages]);    //if the method(getMessage) is memoized then no
                                           //   need to give in dependency array
  if(isMessagesLoading){
    return <div className='animate-pulse size-4'></div>
  }

  if (!selectedUser?._id) {
    return <div>No chats to display</div>;
  }

/* className='chatContainer overflow-x-hidden' */
  return (
    <div>    {/* if we use div then layout structure not comes */}
       <ChatHeader className='chatHeader'/>  {/* className as props */}
       <ChatMessage className='chatMessage'/>   
       <ChatInput className='chatInput'/>
    </div>
  )
}
