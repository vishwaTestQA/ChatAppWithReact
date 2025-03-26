import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";                               

export const useChatStore = create((set)=> ({
   users:[],          //at first we have to fetch users, so its null
   messages:[],
   selectedUser: null,      //while login at first we will see only empty welcome page 
   isUsersLoading: false,   //when fetching users to show loading
   isMessagesLoading: false,

   setSelectedUser: (selectedUser) => {
    set({selectedUser})
   },

   getUsers: async() => {
    set({isUsersLoading: true})
    try {
      const response = await axiosInstance.get('/message/users')
      set({users: response.data})
      toast.success('users updated')
    } catch (error) {
      toast.error("Error retriving users")
    }finally{
      set({isUsersLoading: false})
    }
   },

   getMessages: async (receiver_id) => {
     set({isMessagesLoading:true})
     try {
       const response = await axiosInstance.get(`/message/${receiver_id}`)
       set({messages : response.data})
       toast.success('success message retrived')
      //  if(response.data.length>0){
      //   set({messages : response.data, isMessagesLoading: false})
      //   toast.success('success message retrived')
      //  }else{
      //   // set({messages : "No messages"})
      //   toast.success('no message to retrive')
      //  }
       
     } catch (error) {
       toast.error(error.response.data.message)
     }finally{
      set({isMessagesLoading:false})
     }
   }
  
  // setSelectedUser: (selectedUser) => {
  //   set((state)=>({...state, selectedUser}))
  //  },

  //  getUsers: async() => {
  //   set((state)=> ({...state, isUsersLoading : true}))
  //   try {
  //     const response = await axiosInstance.get('/message/users')
  //     set((state) => ({...state, users: response.data, isUsersLoading:false}))
  //     toast.success('users updated')
  //   } catch (error) {
  //     toast.error("Error retriving users")
  //   }finally{
  //     set((state)=>({...state, isUsersLoading: false}))
  //   }
  //  },

  //  getMessages: async(receiver_id) => {
  //    set((state)=>({...state,isMessagesLoading:true}))
  //    try {
  //      const response = await axiosInstance.get(`/message/${receiver_id}`)
  //      console.log('setting messages')
  //      if(response.data.length>0){
  //       console.log('setting messages inside')
  //       set((state)=>({...state, messages : response.data, isMessagesLoading:false}))
  //       toast.success('success message retrived')
  //      }else{
  //       toast.success('no message to display')
  //      }
  //    } catch (error) {
  //      toast.error(error.response.data.message)
  //    }finally{
  //     set((state)=>({...state, isMessagesLoading:false}))
  //    }
  //  }
}))