import { create } from "zustand";
import { socket } from "../lib/socket";

export const useSocketStore = create((set)=> ({
  socketIs: false,
  connectSocket: () => {
    if(!socket.connected) socket.connect();
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on("message", data => {
      console.log("data123",data)
      set({socketIs: true})
    })
 },

 getMessage: () => {
   socket.on("message", data => {
     console.log("data123",data)
   })
 }

}))