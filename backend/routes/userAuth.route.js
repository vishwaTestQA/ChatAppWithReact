import express from 'express'
import { registerUser } from '../controller/registrationController.js'
import { loginUser } from '../controller/authController.js'
import { logoutUser }  from '../controller/logoutController.js'
import { verifyJWT } from '../middleware/verifyJWT.js'
import { updateProfilePic } from '../controller/updateProfilePicController.js'
import { checkAuth } from '../controller/checkAuth.js'

const authRouter =  express.Router()

//can use this because router.post wont return anything
// export const registerRoute = router.post('/signup', registerUser)
authRouter.post('/signup', registerUser)

authRouter.post('/login', loginUser)

authRouter.post('/logout', logoutUser)

authRouter.put('/update-profile', verifyJWT, updateProfilePic)

//we can call this everytime when user do refresh the page, based on that we can take them to the page that they are currently in or to to login page 
authRouter.get('/check', verifyJWT, checkAuth)

export default authRouter