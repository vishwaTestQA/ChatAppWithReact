import { Server } from "socket.io"

let io = null | Server
let socketId = null
export const socketsForUsers = new Map();

export const initServer = (expressServer) =>{
   io = new Server(expressServer, {
    cors:{
      orgin: process.env.NODE_ENV === 'production' ? false : ["http://localhost:5173/", "http://127.0.0.1:5173"],
      credentials: true,
    }
  })
  
  io.on('connect', socket =>{
    console.log("socketIdfromConnect",socket.id)
    socketId = socket.id
    socket.emit('consoleMsg', "welcome")
    let userId = null
    console.log('userId', userId)
    socket.emit('message', `its from server ${socketsForUsers.get(userId)}`)

    // socket.on('check', id=>{
    //   if(socketsForUsers.get(id)){
    //     console.log("refreshed");
    //     socketsForUsers.set(id, socket.id);
    //   }
    // })
  

    socket.on('login', id => {
      userId = id;
      socketsForUsers.set(userId, socket.id);
      console.log(`Mapped user ${userId} to the socket id ${socket.id}`)
      // socket.emit('message', `its from server ${socketsForUsers.get(userId)}`)
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

export const getSocketId = () => {
  return socketId
}

function buildMsg(name, text){  //use t build the message
  return{
   name,
   text,
   time: new Intl.DateTimeFormat('default',{
     hour: "numeric",
     minute: "numeric",
     second: "numeric"
   }).format(new Date())    // it diplays as 10.30 pm
  }
}