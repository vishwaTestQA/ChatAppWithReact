import { useEffect } from "react"
import { useChatStore } from "../store/useChatStore";
import { socket } from "../lib/socket";

const useSocketListeners = () => {
  const {appendMessages} = useChatStore();

  useEffect(() => {
    console.log('hiiiiiiiiiiiiii')
    socket.on('message', (data) => {
      console.log("received1234567890", data)
      appendMessages(data) // update state
    })

    return () => {
      socket.off('message') // cleanup on unmount
    }
  }, [])
}

export default useSocketListeners