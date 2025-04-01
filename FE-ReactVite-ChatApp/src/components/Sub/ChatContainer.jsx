import React, { useEffect } from 'react'
import { useChatStore } from '../../store/useChatStore';

export const ChatContainer = () => {
  const {selectedUser, getMessages, isMessagesLoading} = useChatStore()

  useEffect(() => {
    // if(selectedUser?._id){
      getMessages(selectedUser._id);         //backend will automatically get our userId in
                                              //in the resp (user set when verifyJWT) so messages to that chat is displyed
    // }
  }, [selectedUser._id, getMessages]);    //if the method(getMessage) is memoized then no
                                           //   need to give in dependency array
  if(isMessagesLoading){
    return <div className='animate-pulse size-4'></div>
  }

  if (!selectedUser._id) {
    return <div>No chats to display</div>;
  }


  return (
    <>    {/* if we use div then layout structure not comes */}
       <ChatHeader className='chatHeader'/>  {/* className as props */}
       <ChatMessage className='chatMessage'/>   
       <ChatInput className='chatInput'/>
    </>
  )
}
