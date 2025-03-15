export const logoutUser = async(req, res) =>{
  try{
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({message: "logged out successfully"})
  }catch(err){
    console.log('logout error', err.message)
  }
   
}