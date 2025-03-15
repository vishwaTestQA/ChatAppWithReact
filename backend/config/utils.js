import jwt from 'jsonwebtoken'

export const generateJwtToken = (userId, res)=>{
  try {
    const token = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m"
    })
  
    res.cookie('jwt', token, {
      maxAge: 30 * 60 * 1000,
      httpOnly: true,   //prevent xss attack, cross site scripting attacks
      sameSite: "strict",   //CSRF attacks(cross site request forgery attacks) 
      secure: process.env.NODE_ENV === 'development'  //if its not dev then returns false
    })
  
    return token;
  } catch (error) {
     console.log('error in generating token', error.message)
  }
  
}

//errors: if the payload is not in object {userId}, then can see err                       "    expected payload to be a plain object   "