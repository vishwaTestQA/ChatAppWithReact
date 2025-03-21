import React, { useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { SignupPage } from './pages/SignupPage'
import { LoginPage } from './pages/LoginPage'
import { SettingsPage } from './pages/SettingsPage'
import { ProfilePage } from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

export const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  const navigate = useNavigate();

  useEffect(()=>{
    console.log('before auth')
    checkAuth();
    console.log('after auth')
  }, [checkAuth])

  console.log(authUser)

  if(isCheckingAuth && !authUser) return <div>
    <Loader className='size-10 animate-spin'/>
    </div>

  return (
    <div>
    <Navbar/>
    <Routes>

      {/* cannot use navigate() directly, it shows error, use inside useEffect */}
      {/* <Route path='/' element={authUser ? <HomePage/> : navigate('/login', {replace: true})}/> */}
      <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login" state={{from:'/'}}/>}/>
      <Route path='/signup' element={!authUser ? <SignupPage/> : <Navigate to="/" state={{from:'/'}}/>}/>
      <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to='/' replace/>}/>
      <Route path='/settings' element={<SettingsPage/>}/>
      <Route path='/profilePage' element={authUser ? <ProfilePage/> : <Navigate to='/login'/>}/>
    </Routes>
    <Toaster/>
    </div>
  )
}
