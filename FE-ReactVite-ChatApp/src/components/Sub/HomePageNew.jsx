import React, { useEffect, useRef, useState } from "react";
import { Activity, Calendar, ChartAreaIcon, ChartBar, Image, Info, LogOut, LucideSettings, MenuIcon, MessageCircle, Phone, Search, Send, Settings2, Settings2Icon, SettingsIcon } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import defaultImage from "../../img/default.jpg";

import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogoutPage } from "../../pages/LogoutPage";
import { NavSection } from "./NavSection";
import { SidebarLayout } from "../layouts/SidebarLayout";
import { Sidebar } from "../Sidebar";

export const HomePageNew = () => {
  const { authUser } = useAuthStore();
  const {
    users,
    getUsers,
    selectedUser,
    getMessages,
    messages,
    setSelectedUser   //newly added for search user and select from the list
  } = useChatStore();

  // useEffect(() => {
  //   if (users?.length === 0) {
  //     getUsers();
  //   }
  // }, [getUsers]);
  // console.log("users", users);
  
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

  const [searchUser, setSearchUser] = useState(null)
  const [searchClick, setSearchClick] = useState(false)
  const [filteredUser, setFilteredUser] = useState(null)
  const inputRef = useRef(undefined)

  const handleSearchClick = ()=>{
    setSearchClick((prev)=> !prev)  
  }

  const handleSearchUser = () => {
    if(searchUser){
      setFilteredUser(users.filter((user) => user.fullname.toLowerCase().startsWith(searchUser.toLowerCase())))
    }
  }

  useEffect(() => {
    handleSearchUser()
  },[searchUser])

  useEffect(()=>{
    inputRef.current?.focus();
  },[searchClick])

  const handleSelectedUser = (user) => {
    setSelectedUser(user)
    setFilteredUser(null)
    setSearchClick(false)
  }

  console.log('selected User is in homepage is', selectedUser)

  useEffect(()=>{
    if (users.length > 0) {
      setSelectedUser(users[0]);
    }  
  },[users])

  const [menubar, setMenubar] = useState(false)
  const handleMenuSidebar = () => {
      setMenubar((prev)=> !prev)
      // setSelectedUser(null);
  }

  return (
    <div>
      {/* start - header section */}
    <header className={`header 
       ${selectedUser ? "header-visiblity" : "block"}
       border-solid p-2`}>
        <div className="flex items-center gap-3">
        <button 
        className="menu-sidebar"
        onClick={handleMenuSidebar}>
        <MenuIcon/>
        </button>  

        <button className="" onClick={handleSearchClick}><Search></Search>
        </button>
        {
          searchClick ? <input type="text" ref ={inputRef} onChange={(e)=> setSearchUser(e.target.value)}></input> : null
        }

        {/* to search and select the user */}
        {
          filteredUser ? 
          <div class="absolute top-10 left-9 w-[200px] bg-black">{
            filteredUser.map((user)=><ul>
              <li key={user._id} className="flex gap-x-2 h-8 mb-1 text-lg" onClick={()=>handleSelectedUser(user)}>
                 <img className="h-full w-[auto] rounded-full" src= {user.profilePic?.url || defaultImage}/>
                 <div>{user.fullname}</div>
                </li>
              </ul>)
          }
          </div> : null
        }
        </div>
        
        <nav className="w-[200px] flex justify-between">
        <Link to='/profilePage'><img className="h-6 w-6 object-contain rounded-full" src={authUser?.profilePic?.url || defaultImage}/></Link>
       
        <Link to='/customSettings'><LucideSettings></LucideSettings></Link>
    
        <LogoutPage/> 
        </nav>
      </header>
   {/* ====== end - header section =========*/}


     {/* <div className="flex">
     <NavSection/>
     <SidebarLayout/>
     </div> */}
    {/* <div className="homeChat">
      <div className={`sidebar ${selectedUser ? "sidebar-visiblity" : "block"}`}>   
      <Sidebar/>
      </div>
      {selectedUser && 
      <div className='chatContainer overflow-x-hidden'><ChatContainer/></div>} */}

<SidebarLayout/>

<div className={`nav border-solid ${
        selectedUser && !menubar ? "nav-visiblity" : "block"
        } p-2`}>
      <NavSection/>
      </div>
    </div>
    
  );
};