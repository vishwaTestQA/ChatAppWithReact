import React, { useEffect, useRef, useState } from "react";
import { Activity, Calendar, ChartAreaIcon, ChartBar, Image, Info, LogOut, LucideSettings, MessageCircle, Phone, Search, Send, Settings2, Settings2Icon, SettingsIcon } from "lucide-react";
import { Sidebar } from "./Sidebar";
import {ChatContainer} from './ChatContainer'
import { useChatStore } from "../../store/useChatStore";
import defaultImage from "../../img/default.jpg";

import { useCompression } from "../../hooks/useCompression";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogoutPage } from "../../pages/LogoutPage";
import { NavSection } from "./NavSection";

export const HomePageNew = () => {
  const { authUser } = useAuthStore();
  const {
    users,
    getUsers,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    isMessagesLoading,
    getMessages,
    messages,
    sendMessage,
  } = useChatStore();

  useEffect(() => {
    if (users?.length === 0) {
      getUsers();
    }
  }, [getUsers]);
  console.log("users", users);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser?._id); //backend will automatically get our userId in
      //in the resp (user set when verifyJWT) so messages to that chat is displyed
    }
  }, [selectedUser?._id, getMessages]); //if the method(getMessage) is memoized then no

  const msgRef = useRef(null);

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  const [searchUser, setSearchUser] = useState()

  const handleSearchClick = ()=>{

  }

  console.log('selected User', selectedUser)
  return (
    <div>
    <header className={`header 
       ${selectedUser ? "header-visiblity" : "block"}
       border-solid p-2`}>
        <button className="" onClick={handleSearchClick}><Search></Search></button>
  
        <div className="w-[200px] flex justify-between">
        <Link to='/profilePage'><img className="h-6 w-6 object-contain rounded-full" src={authUser?.profilePic?.url || defaultImage}/></Link>
       
         <Link to='/customSettings'><LucideSettings></LucideSettings></Link>
    
        <LogoutPage/> 
        </div>
      </header>

    <div className="homeChat">

      <div className={`sidebar ${selectedUser ? "sidebar-visiblity" : "block"}`}>   
      <Sidebar/>
      </div>

      {selectedUser && 
      <div className='chatContainer overflow-x-hidden'><ChatContainer/></div>}

<div className={`nav border-solid ${
        selectedUser ? "nav-visiblity" : "block"
        } p-2`}>
      <NavSection/>
      </div>
    </div>
    
    </div>
  );
};