import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import { LoggedInContextProvider } from './context/LoggedInContext'
import { SocketContextProvider } from './context/SocketContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {/* <React.StrictMode> */}
    <ThemeProvider>
      <LoggedInContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </LoggedInContextProvider>
    </ThemeProvider>
    {/* </React.StrictMode> */}
  </>
)
