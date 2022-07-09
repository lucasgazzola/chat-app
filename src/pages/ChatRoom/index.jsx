import { useState, useContext, useEffect } from 'react'
import { SocketContext } from '../../context/SocketContext'
import InfoContainer from './components/InfoContainer'
import MessagesList from './components/MessagesList'
import SendMessageForm from './components/SendMessageForm'
import useWindowSize from '../../hooks/useWindowSize'


export default function ChatRoom() {

  const { socket } = useContext(SocketContext)

  const [messages, setMessages] = useState([])

  const size = useWindowSize()

  const isMediumScreenSize = size.width < 600
  const isSmallScreenSize = size.width < 500


  useEffect(() => {
    localStorage.getItem('messages')
      && setMessages(JSON.parse(localStorage.getItem('messages')))

    socket.on('sessionstarted', (data) => {
      const { messages } = data
      localStorage.setItem('messages', JSON.stringify(messages))
      setMessages(messages)
    })

    socket.on('messageslist', (messages) => {
      setMessages(messages)
    })

    return () => {
      socket.off('sessionstarted')
      socket.off('messageslist')
    }
  }, [])

  return (
    <div className={`flex 
                  ${isMediumScreenSize ? 'w-full' : 'w-10/12'} 
                  ${isSmallScreenSize ? 'flex-col p-1' : 'flex-row p-4'}
                  bg-grey-200 h-5/6 border border-blue-700 
                  items-center justify-around rounded-md`}>
      <div className='info-container w-max flex flex-col gap-4 p-4 items-center text-center justify-center'>
        <InfoContainer />
      </div>
      <div className='chat-container h-full w-full flex flex-col gap-4'>
        <MessagesList messages={messages} />
        <SendMessageForm />
      </div >
    </div >
  )
}
