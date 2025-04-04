import jwt from 'jsonwebtoken'
import { User } from "../model/user.model.js"

export const verifyJWT = async (req, res, next) => {
  try {
  const cookies = await req.cookies;
  console.log('cook', cookies)
  const token = cookies?.jwt
   console.log('tok', token)
  if(!token){
    return res.status(401).json({message: "unauthorized"})
  }

  //token from user contains userID as well, but in this line we only checks the token is valid or not and not check user is valid
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  if(!decoded){
    return res.status(401).json({message: "Token expired"})
  }

  // now we gona send the user with all fields except password
  const user = await User.findById(decoded.userId).select("-password")

  if(!user){
    return res.status(404).json({message: "user not found"})
  }

  // console.log(user)
  res.user = user   //attaching user prop in res so that the controller which uses this route can access the user directly
  console.log('succesfull in middleware verifyJWT')
  next()
} catch (error) {
    console.log("Error in middleware", error.message)
}
}