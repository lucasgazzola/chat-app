import { createContext, useState } from 'react'

export const LoggedInContext = createContext()

export function LoggedInContextProvider({ children }) {

  const INITIAL_IS_LOGGED_IN = Boolean(localStorage.getItem('username'))

  const [isLoggedIn, setIsLoggedIn] = useState(INITIAL_IS_LOGGED_IN)


  const contextValue = { isLoggedIn, setIsLoggedIn }

  return (
    <LoggedInContext.Provider value={contextValue}>
      {children}
    </LoggedInContext.Provider>
  )
}
