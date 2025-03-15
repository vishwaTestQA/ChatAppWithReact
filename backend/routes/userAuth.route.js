import express from 'express'
import { registerUser } from '../controller/registrationController.js'
import { loginUser } from '../controller/authController.js'
import { logoutUser }  from '../controller/logoutController.js'
import { verifyJWT } from '../middleware/verifyJWT.js'
import { updateProfilePic } from '../controller/updateProfilePicController.js'
import { checkAuth } from '../controller/checkAuth.js'

const router =  express.Router()

export const registerRoute = router.post('/signup', registerUser)

export const loginRoute = router.post('/login', loginUser)

export const logoutRoute = router.get('/logout', logoutUser)

export const updateProfilePicRoute = router.put('/update-profile', verifyJWT, updateProfilePic)

//we can call this everytime when user do refresh the page, based on that we can take them to the page that they are currently in or to to login page 
export const checkUserAuthRoute = router.put('/check', verifyJWT, checkAuth)