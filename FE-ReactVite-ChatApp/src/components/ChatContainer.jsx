import { Cross } from 'lucide-react'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import {shallow} from 'zustand/shallow'
import { useSocketStore } from '../store/useSocketStore';
import { socket } from '../lib/socket';
import useSocketListeners from '../hooks/useSocketListeners';

export const ChatContainer = () => {
  const {selectedUser, getMessages, isMessagesLoading} = useChatStore()


  // const { selectedUser, getMessages } = useChatStore(   //not required not works well
  //   (state) => ({
  //     selectedUser: state.selectedUser,
  //     getMessages: state.getMessages,
  //   }),
  //   shallow
  // )

  useEffect(() => {
    // if(selectedUser?._id){
      getMessages(selectedUser._id);         //backend will automatically get our userId in
                                              //in the resp (user set when verifyJWT) so messages to that chat is displyed
    // }
    // console.log("getingMsg",getMessage());
  }, [selectedUser._id, getMessages]);    //if the method(getMessage) is memoized then no
                                           //   need to give in dependency array
  if(isMessagesLoading){
    return <div className='animate-pulse size-4'></div>
  }

  if (!selectedUser._id) {
    return <div>No chats to display</div>;
  }

  return (
    <>           {/* if we use div then layout structure not comes */}
       <ChatHeader className='chatHeader'/>  {/* className as props */}
       <ChatMessage className='chatMessage'/>   
       <ChatInput className='chatInput'/>
    </>
  )
}
