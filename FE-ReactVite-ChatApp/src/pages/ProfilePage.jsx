import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react'
import defaultImage from '../img/default.jpg'
import imageCompression from 'browser-image-compression'
import { useCompression } from '../hooks/useCompression'

export const ProfilePage = () => {
  const {authUser, updateProfilePic, isUpdatingProfile} = useAuthStore()
  // const [profilePic, setProfilePic] = useState(authUser?.profilePic);
  const [selectedImage, setSelectedImage] = useState(null)

  const [removeProfilePic, setRemoveProfilePic] = useState(false)

  const updateImage = (e)=>{
    const file = e.target.files[0];
    if(!file) return

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async() => {
      const base64Image = reader.result
      setSelectedImage(base64Image)
      await updateProfilePic({profilePicFromUser: base64Image})
    }

  }

    const {compressedImage, loading, error, compressImage} = useCompression()

    const [imageForCompression, setImageForCompression] = useState(false);
 
  const updateCompressedImage = async (e) =>{
    const file = e.target.files[0];
    if(!file) return
    compressImage(file)
    // const base64Image = await compressImage(file)
    // console.log(base64Image)
    // setSelectedImage(base64Image)
    // await updateProfilePic({profilePicFromUser: base64Image})
    // const reader = new FileReader();

    //  // Compression options
    //  const options = {
    //   maxSizeMB: 1, // Reduce to 1MB
    //   maxWidthOrHeight: 800, // Resize
    //   useWebWorker: true,
    // };

    // try {
    //   const compressedFile = await imageCompression(file, options);
    //   // const base64 = await convertToBase64(compressedFile);
    //   reader.readAsDataURL(compressedFile);

    //   reader.onload = async() => {
    //   const base64Image = reader.result
    //   setSelectedImage(base64Image)
    //   await updateProfilePic({profilePicFromUser: base64Image})
    // }
    // } catch (error) {
    //   console.error("Compression failed:", error);
    // }
  };

   useEffect(()=>{
      if(compressedImage){
        setSelectedImage(compressedImage)
        updateProfilePic({profilePicFromUser: compressedImage})
      }
    },[compressedImage])

  const handleRemovePic = async() => {
    setSelectedImage(null)
    await updateProfilePic({profilePicFromUser: 'remove'})
  }

  return (
    <div className='p-10 bg-gray w-600 h-600 rounded-md flex flex-col justify-center items-center border-white'>
      {/* <label htmlFor="image"></label>
      <div className='relative size-8'>
      <Camera className='size-8'/>
      <input type="file" id="image" className='hidden'/>
      </div> */}

      <div className='w-40 h-40 rounded-full bg-white relative'> 
       <img src={selectedImage || authUser.profilePic.url || defaultImage} alt='tom' className='w-full h-full object-cover rounded-full' onError={e=> (e.target.src = "./tom3.jpg")}/>
       <label 
       htmlFor="image" 
       className="cursor-pointer absolute bottom-0 right-5 size-8">
      <Camera className="size-8 p-1 text-black bg-yellow-600 hover:text-gray-700 rounded-full" />
      <input 
      type="file" 
      id="image" 
      className="hidden" 
      onChange={updateCompressedImage}/>
      </label>
      <button 
      className='absolute top-4 left-0 w-6 h-6 bg-black text-center'
      onClick={handleRemovePic}>
        <span>X</span>
      </button>
      </div>

      {
      isUpdatingProfile 
        ? <div className='animate-spin size-4'></div> 
        : <p>click the camera icon to update your profile pic</p> 
      }                                                                                                             
      <div>
        <div>
        <User className='inline-block'/>
        <label>Full Name</label>
        </div>
        <input type="text"  value={authUser.fullname} readOnly></input>
      </div>

      <div>
        <div>
        <Mail className='inline-block'/>
        <label>Email Address</label>
        </div>
        <input type="text" className='' readOnly value={authUser?.email}></input>
        
      </div>
      
      <div>
        <h3>Account Information</h3>
        <p>Member since</p>
        <p>Member status</p>
      </div>
      
    </div>
  )
}
