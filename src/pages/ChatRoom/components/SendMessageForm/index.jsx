import { Input, Button, Alert } from '@material-tailwind/react'
import { useState, useContext } from 'react'
import { SocketContext } from '../../../../context/SocketContext'
import useLocalStorage from '../../../../hooks/useLocalStorage'
import useWindowSize from '../../../../hooks/useWindowSize'
import { FiSend } from 'react-icons/fi'


export default function SendMessageForm() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  const { socket } = useContext(SocketContext)

  const { username, chatroomNumber } = useLocalStorage()

  const size = useWindowSize()

  const isXSmallScreenSize = size.width < 350

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

  const handleSumbitMessage = (e) => {
    e.preventDefault()
    if (message === '') {
      setError('Message cannot be empty')
      setTimeout(() => {
        setError(null)
      }, 2000)
      return
    }
    socket.emit('newmessage', { message, username, chatroomNumber })
    setMessage('')
  }

  return (
    <div className='relative flex flex-col'>
      {
        error && (
          <div className='absolute w-full -top-16'>
            <Alert color="red">{error}</Alert>
          </div>
        )
      }
      <form
        onSubmit={handleSumbitMessage}
        className={
          `flex gap-4 
          ${isXSmallScreenSize
            ? 'flex-col'
            : 'flex-row'}`
        }>
        <Input
          title='Message'
          autoFocus
          onChange={handleMessageChange}
          value={message}
          className='w-full min-w-min'
          color="indigo"
          label="Message"
        />
        <div className='min-w-fit flex'>
          <Button
            className={`h-full flex items-center justify-center text-center 
            ${isXSmallScreenSize && 'w-full'}`}
            type="submit"
            variant="filled"
          >
            <FiSend />
          </Button>
        </div>
      </form>
    </div>
  )
}
