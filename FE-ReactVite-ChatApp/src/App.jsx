import React from 'react'
import { Navbar } from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { SignupPage } from './pages/SignupPage'
import { LoginPage } from './pages/LoginPage'
import { SettingsPage } from './pages/SettingsPage'
import { ProfilePage } from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'

export const App = () => {
  const {authUser, checkAuth} = useAuthStore()
  return (
    <div>
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/settings' element={<SettingsPage/>}/>
      <Route path='/profilePage' element={<ProfilePage/>}/>
    </Routes>
    </div>
  )
}
