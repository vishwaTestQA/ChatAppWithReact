import { generateJwtToken } from "../config/utils.js";
import { User } from "../model/user.model.js";
import bcrypt from 'bcrypt'

export const loginUser = async(req, res) => {
   const {email, password} = req.body;
   if(!email || !password){
    return res.status(400).json({message: "email and password are required"})
   }

   const foundUser = await User.findOne({email})

   if(!foundUser){
    return res.status(400).json({message: "User does not exist"})
   }


   try {
   const isPasswordValid = bcrypt.compare(password, foundUser.password)

   if(!isPasswordValid){
    return res.status(400).json({message: "Invalid password"})
   }
   
   generateJwtToken(foundUser._id, res)

   res.status(200).json({
    _id: foundUser._id,
    fullname: foundUser.fullname,
    email: foundUser.email,
    profilePic: foundUser.profilePic
   })

  } catch (error) {
     res.status(500).json({message: "Internal server error"})
  }
}