import { User } from "../model/user.model.js";
import cloudinary from '../config/cloudinary.js'

export const updateProfilePic = async (req, res) => {
  try {
    const { profilePic } = req.body;
    
    if(!profilePic){
      return res.status(400).json({message: "profile pic is required"})
    }

    const userId = res.user._id;    //while verifying the token we setting res.user = user;
                                 //hence the middleware (verifyJWT()) has modified the res

    //upload the reponse to cloudinary (image and video repository)
    const uploadResponse = await cloudinary.uploader.upload(profilePic)

    const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new: true})   //{new:true} will return the user object after updation
      
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log("error in uploader", error.message)
  }
}