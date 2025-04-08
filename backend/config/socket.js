import { Server } from "socket.io"

let io = null | Server
export const socketsForUsers = new Map();

export const initServer = (expressServer) =>{
   io = new Server(expressServer, {
    cors:{
      orgin: process.env.NODE_ENV === 'production' ? false : ["http://localhost:5173/", "http://127.0.0.1:5173"],
      credentials: true,
    }
  })
  
  io.on('connect', socket =>{
    console.log("socketId",socket.id)
    socket.emit('consoleMsg', "welcome")

    socket.on('login', userId => {
      
      //anyuser connecting to this socket will be added to the store and their socketId is accesible using the userId
      socketsForUsers.set(userId, socket.id);
      console.log(`Mapped user ${userId} to the socket id ${socket.id}`)

      socket.emit('message', socketsForUsers.get(userId))

      console.log(socketsForUsers)
    })

    socket.on('disconnect', (reason) => {
      console.log("reason", reason)
    });


  })
}

export const getIO = () => {
  return io;
}
