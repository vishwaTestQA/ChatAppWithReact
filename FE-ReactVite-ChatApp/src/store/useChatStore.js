import { create } from "zustand";

export const useChatStore = create((set)=> ({
   users:[],          //at first we have to fetch users, so its null
   messages:[],
   selectedUser: null,      //while login at first we will see only empty welcome page 
   isUsersLoading: false,   //when fetching users to show loading
   isMessagesLoading: false,

   getUsers: async() => {
    set({isUsersLoading: true})
    try {
      const response = 
    } catch (error) {
      
    }
   }
}))