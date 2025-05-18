import { useEffect, useState } from "react"

export const useOnlineCheck = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  const handleCheck = () => {
    setIsOnline(navigator.onLine)
  }

  useEffect(() => {
    console.log('events==========')
    window.addEventListener('online', handleCheck)
    window.addEventListener('offline', handleCheck)
  },[])

  return isOnline
}