import { createContext, useState, useEffect } from 'react'
import { io } from "socket.io-client";

const SOCKET_URL = "https://lucas-chat-app-server.herokuapp.com/"

export const SocketContext = createContext()

export function SocketContextProvider({ children }) {

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    setSocket(socket);
  }, [])

  const contextValue = { socket }

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  )
}
