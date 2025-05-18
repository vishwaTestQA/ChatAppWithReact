import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

export const useNetworkStatus = () => {
  let isFirstRender =  useRef(true)
  useEffect(()=>{
    const showOffline = () => {
      if(!isFirstRender.current){
        toast.error('you are offline')
      }
    }

    const showOnline = () => {
      if(!isFirstRender.current){
        toast.success('you are back online')
      }
    }

    window.addEventListener('offline', showOffline)
    window.addEventListener('online', showOnline)

    isFirstRender = false;

    return () => {
      window.removeEventListener('offline', showOffline)
      window.removeEventListener('online', showOnline)
    }
  }, [])
  console.log('networkstatus')
}
