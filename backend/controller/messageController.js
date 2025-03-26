import cloudinary from "../config/cloudinary.js";
import Message from "../model/message.model.js";
import { User } from "../model/user.model.js";

export const getUsersForSideBar = async(req, res) =>{
  //fetch all the users except ourself
  try {
    const loggedInUser = res.user._id;

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
     {receiverId, senderId}
    ]
   })
   console.log('messages', messages)
   res.status(200).json(messages)
  } catch (error) {
    //logevents to get the error from the this function
    res.status(500).json({error:`Internal server error ${error.message}`})
  }
}

export const sendMessage = async(req, res) => {
  try {
  //1. need to get the sender id
  const {text, image} = req?.body
  const {id: receiverId} = req.params
  const {id: senderId} = req.user._id
  
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
  res.status(200).json()
} catch (error) {
    res.status(500).json({error: "internal server error"})
}
}