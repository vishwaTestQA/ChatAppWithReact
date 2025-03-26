import { Send } from 'lucide-react'
import React, { useState } from 'react'

export const ChatInput = () => {
  const [inpValue, setInpValue] = useState('')
  const handleSendMessage = (e) => {
    e.preventDefault();
    //handling sending message 
  }
  return (
    <div className='flex gap-2'>
      <input type='text' onChange={e => setInpValue(e.target.value)} value={inpValue}></input>
      <button onClick={handleSendMessage}><Send className='size-4'></Send></button>
    </div>
  )
}
