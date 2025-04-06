import React, { useEffect, useRef, useState } from 'react'
import { useCompression } from '../../hooks/useCompression'
import { useChatStore } from '../../store/useChatStore'
import { Image, Send } from 'lucide-react'

export const ChatInput = ({className=''}) => {
   const [inpValue, setInpValue] = useState('')
    const [image, setImage] = useState(null)

    const [imageForCompression, setImageForCompression] = useState(false)
    const {sendMessage} = useChatStore()
  
    const {compressedImage, loading, error, compressImage} = useCompression()
  
    const fileRef = useRef(null)
    const textareaRef = useRef(null)
  
    const handleSendMessage = (e) => {
      e.preventDefault();
      sendMessage({text:inpValue, image})
    }
  
    const handleImageChange = (e) =>{
     const file = e.target.files[0];
     setImageForCompression(true)
     compressImage(file)
    }
  
    const handleClickImage = (e) => {
       fileRef?.current.click()
    }
  
    const handleRemoveImage = () =>{
      setImage(null)
    }
  
    //set the image to this component state
    useEffect(()=>{
      if(compressedImage){
        setImage(compressedImage)
      }
    },[compressedImage])
  
    useEffect(()=>{
      if(textareaRef.current){
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    },[inpValue])

  return (
    // min-h-[1.5rem] max-h-[7.5rem]
    <div
    className={`${className} flex gap-2 justify-between items-end overflow-hidden relative p-3`}
  >
    {imageForCompression && loading && <div>Loading...</div>}

    {error && <div>upload error.</div>}

    {image && (
      <img
        className="absolute w-16 left-0 top-0 bottom-full object-contain overflow-auto "
        src={image}
      ></img>
    )}
    {image && (
      <button className="absolute" onClick={handleRemoveImage}>
        X
      </button>
    )}
    <textarea
      type="text"
      ref={textareaRef}
      rows="2"
      onChange={(e) => setInpValue(e.target.value)}
      value={inpValue}
      className="w-[80%] min-h-[1.5rem] max-h-[7.5rem] overflow-auto resize-none p-2"
    />
    <input
      type="file"
      accept="image/*"
      className="hidden"
      ref={fileRef}
      onChange={handleImageChange}
    />

    <button onClick={handleClickImage}>
      <Image ></Image>
    </button>

    <button onClick={handleSendMessage}>
      <Send className="size-6"></Send>
    </button>
  </div>
  )
}
