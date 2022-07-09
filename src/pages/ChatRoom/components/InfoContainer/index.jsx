import { useContext } from 'react'
import { Typography, Button } from '@material-tailwind/react'
import useLocalStorage from '../../../../hooks/useLocalStorage'
import { LoggedInContext } from '../../../../context/LoggedInContext'
import { SocketContext } from '../../../../context/SocketContext'

export default function InfoContainer() {


  const { socket } = useContext(SocketContext)

  const { username, chatroomNumber } = useLocalStorage()

  const { setIsLoggedIn } = useContext(LoggedInContext)


  const handleLogout = () => {
    socket.emit('sessionended', { username, chatroomNumber })
    localStorage.removeItem('username')
    localStorage.removeItem('chatroomNumber')
    setIsLoggedIn(false)
  }

  return (
    <>
      <Typography variant='h5'>
        Room number:
        <Typography variant='h6'
          className='text-indigo-700'
        >
          {chatroomNumber}
        </Typography>
      </Typography>
      <Typography variant='h5'>
        Username:
        <Typography variant='h6'
          className='text-indigo-700'
        >
          {username}🟢
        </Typography>
      </Typography>
      <Button
        onClick={handleLogout}
        className='w-min'
        color='red'
        type="button"
        variant="filled"
      >
        Logout
      </Button>
    </>
  )
}