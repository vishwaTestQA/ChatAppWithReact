// import { io } from "https://cdn.jsdelivr.net/npm/socket.io-client@4.7.2/+esm"
import {io} from 'socket.io-client'
// import { useChatStore } from '../store/useChatStore'

// const {appendMessages} = useChatStore()
export const socket = io('http://localhost:4000/',{
  withCredentials: true,
  transports: ['websocket'],
  reconnection: true,
})

// const listenForMessage = () => {
//   socket.on('message', data => {
//     //  appendMessages(data)
//     console.log("received data", data)
//   })
// }
export let id='';
socket.on('connect', () => {
  console.log('Connected!', socket.id)
  id = socket.id
})

socket.on('sockid', () => {
  console.log('Connected!', socket.id)
  id = socket.id
})



// export const emitMessage = (messageData, selectedUserId) => {
//   socket.emit('message', {text: messageData, receiverId: selectedUserId})
// }

