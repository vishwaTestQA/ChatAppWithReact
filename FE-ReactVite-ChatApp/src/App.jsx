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
import { useThemeStore } from './store/useThemeStore'
import { CustomThemePage } from './pages/customThemePage'
import { useCustomThemeStore } from './store/useCustomThemeStore'
import { HomePageAll } from './pages/HomePageAll'

export const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  const {theme} = useThemeStore()
  const {customTheme} = useCustomThemeStore()
  const navigate = useNavigate();
 
  useEffect(()=>{
    console.log('before auth')
    checkAuth();
    console.log('after auth')
  }, [checkAuth])

  console.log("authUser", authUser)
  console.log('customTheme', customTheme)

  if(isCheckingAuth && !authUser) return <div>
    <Loader className='size-10 animate-spin'/>
    </div>

  return (
    // <div data-theme={theme} className='h-screen'>  //for daisyui themes
    <div className='h-screen' style={{background:customTheme.bgColor, color:customTheme.textColor}}>
    {/* <Navbar/> */}
    <Routes>

      {/* cannot use navigate() directly, it shows error, use inside useEffect */}
      {/* <Route path='/' element={authUser ? <HomePage/> : navigate('/login', {replace: true})}/> */}
      <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login" state={{from:'/'}}/>}/>
      <Route path='/signup' element={!authUser ? <SignupPage/> : <Navigate to="/" state={{from:'/'}}/>}/>
      <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to='/' replace/>}/>
      <Route path='/settings' element={<SettingsPage/>}/>
      <Route path='/profilePage' element={authUser ? <ProfilePage/> : <Navigate to='/login'/>}/>
      <Route path='/customSettings' element={authUser ? <CustomThemePage/> : <Navigate to='/'/>}/>
    </Routes>
    <Toaster/>
    </div>
  )
}
