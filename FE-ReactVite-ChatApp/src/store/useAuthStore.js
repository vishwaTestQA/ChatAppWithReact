import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
  authUser: null,          //loggedin user data
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile:false,

  isCheckingAuth: true,

  checkAuth: async() => {
    console.log("checking")
    try {
      const res = await axiosInstance.get('/auth/check')
      console.log(res.data)
      set({authUser: res.data})
    } catch (error) {
      console.log('checkAuth error', error.message)
      set({authUser:null})   //when this function doesnt work then we need to set null
    }finally{
      set({isCheckingAuth: false})
    }
  },

   signUp: async(formData)=>{
     set({isSigningUp: true})
     try {
       const resp = await axiosInstance.post("/auth/signup", formData)
       set({authUser: resp.data})
       toast.success("signing up success")
     } catch (error) {
       set({authUser: null})
       toast.success("Error signingup")
     }
   },

   login: async(formData) => {
     set({isLoggingIn: true})
     try {
       const resp = await axiosInstance.post('/auth/login', formData);
       set({authUser: resp.data})
       toast.success("Logged in successfully")
     } catch (error) {
      set({authUser: null})
      toast.success("Login failed")
     }finally{
      set({isLoggingIn:false})
     }
   },

   logout: async() => {
     try {
      const resp = await axiosInstance.post('/auth/logout')
      set({authUser: null})
      toast.success("successfully logged out")
     } catch (error) {
      // set({authUser: null})
      toast.error('loggedOut unsuccess')
     }
   },

   updateProfilePic: async(data)=>{
     set({isUpdatingProfile: true})
     try {
       const resp = await axiosInstance.put('/auth/update-profile', data)
       set({authUser: resp.data})
       toast.success("profile picture updated successfully")
     } catch (error) {
      set({isUpdatingProfile: false})
      toast.error("profile picture updation error")
     }finally{
      set({isUpdatingProfile: false})
     }
   }
})) 

