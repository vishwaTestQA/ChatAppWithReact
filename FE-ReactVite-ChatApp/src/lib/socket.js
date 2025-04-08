// import { io } from "https://cdn.jsdelivr.net/npm/socket.io-client@4.7.2/+esm"
import {io} from 'socket.io-client'

export const socket = io('http://localhost:4000/',{
  withCredentials: true,
  transports: ['websocket'],
  reconnection: true,
})