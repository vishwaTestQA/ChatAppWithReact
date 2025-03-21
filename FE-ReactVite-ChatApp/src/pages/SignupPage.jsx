import React, { useState } from 'react'
import { axiosInstance } from '../lib/axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';

export const SignupPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.pathname == '/signup' ? '/' : '';

  // const [showConfrmPswd, setShowCnfrmPswd] = useState(false)
  const [confrmPswd, setcnfrmPswd] = useState('')
  const [formData, setFormData] = useState({
    email:'',
    fullname:'',
    password:'',
  })

  const {isSigningUp, signUp} = useAuthStore()
  const submitForm = async(e) => {
    e.preventDefault()
    signUp(formData);
    // console.log(from);
    // // console.log(formData);
    // // let resp;
    // try{
    //   // resp = await axiosInstance.post("/auth/signup", formData)
    //   // navigate(from, {replace:true, state:{user: formData.fullname}})
    // }catch(error){
    //   console.log(error.message)
    // }

  }
 
return (
<div className='flex flex-col gap-3 max-w-52'>
<div>
<input type="text" placeholder="username" className="input input-lg" 
onChange={e => setFormData({...formData, fullname: e.target.value})}
value={formData.fullname}
/>
</div>
<div>
<input type="text" placeholder="email" className="input input-lg" 
onChange={e => setFormData({...formData, email: e.target.value})}
value={formData.email}
/>
</div>
<div>
<input type="password" placeholder="password" className="input input-lg" 
onChange={e=> setFormData({...formData, password:e.target.value})}
value={formData.password}/>
</div>
<div>
<input type="password" placeholder="confirm password" className="input input-lg" 
onChange={e=> setcnfrmPswd(e.target.value)}
value={confrmPswd}
/>
</div>
<div>
  <button className='bg-white text-black' type='submit' onClick={submitForm}>Submit</button>
  </div>
</div>
  )
}
