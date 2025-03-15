import { generateJwtToken } from "../config/utils.js";
import { User } from "../model/user.model.js";
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) =>{
  const {fullname, email, password} = req.body; //add app.use(express.json()) in server.js

  if(!fullname || !password || !email){
    return res.status(400).json({message: "fullname, email and password are required"});
  }

  if(password?.length <8){
    return res.status(400).json({message: "password length should be above 8 charecters"});
  }
  
  const foundUser = await User.findOne({email})
   if(foundUser){
    return res.status(400).json({message: "user alredy present"})
   }

   try{
    const hashedPassword = await bcrypt.hash(password, 10);

    //create and store new user
    const newUser = new User({
      email,
      fullname,
      password: hashedPassword,
    })

    //create jwt token
    if(newUser){
      console.log('newUserId', newUser._id)
      generateJwtToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullname: newUser.fullname,
        profilePic: newUser.profilePic 
      })
    }else{
      res.status(400).json({message: "Invalid user data"})
    }
   }catch(err){
      res.status(500).json({message: "internal server error"})
   }
   





}
