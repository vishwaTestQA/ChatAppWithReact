import { Activity, Calendar, MessageCircle, Phone } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../../store/useChatStore'

export const NavSection = () => {
  const {selectedUser} = useChatStore()
  
  const handleClickChatSection = () =>{

  }

  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.click(); // Auto-click the button on mount
    }
  }, []);

  return (
    <nav
    className='navItems'
    // className={`nav border-solid ${
    // selectedUser ? "nav-visiblity" : "block"
    // } p-2`}
    /* flex justify-around p-2 */
>
  <button><Activity/></button>
  <button 
  ref={buttonRef}
  className="IconClicked" 
  onClick={handleClickChatSection}><MessageCircle/></button>
  <button><Phone/></button>
  <button><Calendar/></button>
</nav>
  )
}
