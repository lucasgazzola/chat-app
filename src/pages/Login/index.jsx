import { useContext, useState } from 'react'
import { Input, Button, Typography, Alert } from '@material-tailwind/react'
import { LoggedInContext } from '../../context/LoggedInContext'
import { SocketContext } from '../../context/SocketContext'
import './Login.css'

export default function Login() {

  const { socket } = useContext(SocketContext)

  const { setIsLoggedIn } = useContext(LoggedInContext)

  const [username, setUsername] = useState('')
  const [chatroomNumber, setChatroomNumber] = useState('')
  const [error, setError] = useState(null)

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handleChatroomNumberChange = (e) => {
    setChatroomNumber(e.target.value)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === '' || chatroomNumber === '') {
      setError('Please fill in all fields')
      setTimeout(() => {
        setError(null)
      }, 3000)
      return
    }
    setIsLoggedIn(true)
    localStorage.setItem('username', username)
    localStorage.setItem('chatroomNumber', chatroomNumber)
    socket.emit('sessionstarted', { username, chatroomNumber })
  }

  return (
    <form
      className="flex flex-col gap-4 border-2 bg-grey-200 border-indigo-600 rounded-lg p-10"
      onSubmit={handleLogin}
    >
      <Typography
        variant="lead"
        color="indigo"
        textGradient
        className="text-center font-bold"
      >
        Please Login to chat
      </Typography>
      <Input
        color="indigo"
        onChange={handleUsernameChange}
        value={username}
        label="Username"
      />
      <Input
        color="indigo"
        onChange={handleChatroomNumberChange}
        value={chatroomNumber}
        label="ChatRoom Number"
      />
      <Button
        color="indigo"
        type="submit"
        className="w-full"
        variant="filled"
      >
        Login
      </Button>
      <Alert show={Boolean(error)} color="red">{error ?? ''}</Alert>
    </form>
  )
}
