import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import { getIO, socketsForUsers } from "../config/socket.js";
import Message from "../model/message.model.js";
import { User } from "../model/user.model.js";

export const getUsersForSideBar = async(req, res) =>{
  //fetch all the users except ourself
  try {

    // Even though loggedInUser may look like an ObjectId ("66163e2b..."), it’s a string, and $ne doesn’t match properly unless the types match exactly.
    const loggedInUser = res.user._id;

    // const loggedInUser = mongoose.Types.ObjectId(req.user._id)
    console.log("loggedInUser",loggedInUser);

    //selects all users except "loggedInUser" so that we used $ne (notequal) and we no need to send password to the client
    const filterUsers = await User.find({_id: {$ne: loggedInUser}}).select("-password")
    res.status(200).json(filterUsers)
  } catch (error) {
    res.sendStatus(500)
  }
}

export const getOneToOneMessageChatList = async(req, res) =>{
  try {
    console.log('getOneToOneMessageChatList')
   const senderId = res.user._id;   //when verifying jwt it attach the user
   const {id: receiverId} = req.params;   //destructured if from req.params
  
   //we fetch all the messages with filter where the sender is us and reciver is other person or viceversa
   // find will give list - can apply some filter here $or is used to either this or that
   const messages = await Message.find({
    $or:[
     {senderId, receiverId},
     {senderId: receiverId, receiverId: senderId}
    // {receiverId, senderId}
    ]
   })

//    { senderId, receiverId } → shorthand for { senderId: senderId, receiverId: receiverId }

// { senderId: receiverId, receiverId: senderId } → reversed pair

  //  console.log("messages", messages)
   res.status(200).json(messages)
  } catch (error) {
    //logevents to get the error from the this function
    res.status(500).json({error:`Internal server error ${error.message}`})
  }
}

export const sendMessage = async(req, res) => {
  try {
  //1. need to get the sender id
  const {text, image=""} = req?.body
  const {id: receiverId} = req.params       //the user we want to send msg, here id denotes the name of the param which we assigned in the route

  const {_id: senderId} = res.user      //our id destructured from user

  let imageUrl;
  if(image){   //if the message has image then need to upload it on cloudinary
    //upload base64 image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image)
    imageUrl = uploadResponse.secure_url
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    text,
    image: imageUrl
  })
 
  await newMessage.save()

  //todo: realtime functionality: socketIO
  res.status(200).json(newMessage)
  
  console.log(socketsForUsers)
  getIO().to(socketsForUsers.get(receiverId)).emit('message', newMessage)

} catch (error) {
    res.status(500).json({error: `internal server error ${error}`})
}
}   