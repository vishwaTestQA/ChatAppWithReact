import React, { useState } from 'react'
import { ChatPage } from '../Sub/ChatPage'
import { NavSection } from '../Sub/NavSection'

export const SidebarLayout = () => {
  const [sidebarPage, setSidebarPage] = useState('message')
  return (
    <div className='side'>
      {/* <NavSection
        sidebarPage = {sidebarPage}
        setSidebarPage = {setSidebarPage}
      /> */}
      {
        sidebarPage === 'message' && <ChatPage/>
      }{

      }
    </div>
  )
}
