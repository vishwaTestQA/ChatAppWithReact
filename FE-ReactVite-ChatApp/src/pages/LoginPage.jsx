import React, { useState } from 'react'
import { axiosInstance } from '../lib/axios'
import { useAuthStore } from '../store/useAuthStore'
import { Navigate, replace, useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const LoginPage = () => {

  //server response if success
  // res.status(200).json({
  //   _id: foundUser._id,
  //   fullname: foundUser.fullname,
  //   email: foundUser.email,
  //   profilePic: foundUser.profilePic
  //  })


  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {authUser} = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  // const from = location.state.from

  const {isLoggingIn, login} = useAuthStore();

  const submitLogin = (e) => {
    e.preventDefault()
    login(formData)
    navigate(from)
  }

  return (
    <div>
      <form onSubmit={submitLogin}>
        <label>Email</label>
          <input type="text" 
          onChange={e=> setFormData({...formData, email: e.target.value})} 
          value={formData.email}/>

          <label>password</label>
          <input type="password" onChange={e=> setFormData({...formData, password: e.target.value})} value={formData.password}/>

          <button type='submit'>Login</button>
       </form>
          <Link to='/signup'>Signup</Link>

    </div>
  )
}
