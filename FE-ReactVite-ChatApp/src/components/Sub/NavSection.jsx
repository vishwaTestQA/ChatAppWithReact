import { Activity, Calendar, MessageCircle, Phone } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../../store/useChatStore'


export const NavSection = ({setSidebarPage, sidebarPage}) => {
//   const messageButtonRef = useRef(null)
//   const handleClickChatSection = () =>{ 
//   }

//   const handlePhoneSection = () =>{
//     return <div>
//       phone
//     </div>
//   }
const messageButtonRef = useRef(undefined);

const buttons = [
  {
    key: 'activity',
    icon: Activity,
    // onClick: null,
  },
  {
    key: 'message',
    icon: MessageCircle,
    // onClick: handleClickChatSection,
    ref: messageButtonRef,
    // className: 'icon-clicked',
  },
  {
    key: 'phone',
    icon: Phone,
    // onClick: handlePhoneSection,
  },
  {
    key: 'calendar',
    icon: Calendar,
    // onClick: null,
  },
];
  const {selectedUser} = useChatStore()

  useEffect(() => {
    console.log('autoClick')
      messageButtonRef.current?.click(); // Auto-click the button on mount
  },[]);

  return (
    <nav
    className='navItems'
    // className={`nav border-solid ${
    // selectedUser ? "nav-visiblity" : "block"
    // } p-2`}
    /* flex justify-around p-2 */
>
  {/* <button><Activity/></button>
  <button 
  ref={buttonRef}
  className="IconClicked" 
  onClick={handleClickChatSection}><MessageCircle/></button>
  <button onClick={handleClickChatSection}><Phone/></button>
  <button><Calendar/></button> */}
   {buttons.map(({ key, icon: Icon, onClick, ref }) => (
        <button
          key={key}
          // onClick={onClick ?? undefined}
          ref={ref ?? undefined}
          onClick={() => setSidebarPage(key)}
          className={`p-2 rounded hover:bg-slate-500 transition ${sidebarPage === key ? ' active:bg-slate-500' : ''}`}
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}
</nav>
  )
}
