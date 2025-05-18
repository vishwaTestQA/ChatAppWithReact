import { getSocketId, socketsForUsers } from "../config/socket.js";

export const checkAuth = (req, res) => {
  try {
    console.log(res.user)
    console.log("socketiddddddddd", getSocketId())
    console.log("string id", res.user._id.toString())
    socketsForUsers.set(res.user._id.toString(), getSocketId())
    res.status(200).json(res.user);      //req.user is alredy set in verifyJwt middleware
  } catch (error) {
    res.status(500).json({message: "internal server error"})
  }
}