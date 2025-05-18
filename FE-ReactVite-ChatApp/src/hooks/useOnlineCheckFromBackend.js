import { useState, useEffect } from 'react'

export const useOnlineCheckFromBackend = () => {
  const [isOnline, setIsOnline] = useState(true)

  const verifyConnection = async () => {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 3000)

      const response = await fetch('http://localhost:4000/api/ping/isConnected', { signal: controller.signal })
      clearTimeout(timeout)

      setIsOnline(response.ok)
    } catch (e) {
      setIsOnline(false)
    }
  }

  useEffect(() => {
    window.addEventListener('online', verifyConnection)
    window.addEventListener('offline', () => setIsOnline(false))

    // Initial check
    verifyConnection()

    return () => {
      window.removeEventListener('online', verifyConnection)
      window.removeEventListener('offline', () => setIsOnline(false))
    }
  }, [])

  return isOnline
}