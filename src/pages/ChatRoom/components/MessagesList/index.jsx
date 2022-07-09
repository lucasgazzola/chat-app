import { useRef, useEffect } from 'react'
import useLocalStorage from '../../../../hooks/useLocalStorage'
import MessageItem from '../MessageItem'


export default function MessagesList({ messages }) {

  const messagesEndRef = useRef()

  const { username } = useLocalStorage()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
    , [messages])


  return (
    <ul className='overflow-auto messages-container border border-indigo-700 px-3 py-5 rounded-md w-full h-full'>
      {
        messages.length > 0
          ? messages.map((messageItem, index) => {
            const { message, username: messageUsername } = messageItem
            return (
              <MessageItem
                key={`${message}${index}`}
                message={message}
                username={messageUsername}
                isCurrentUser={username === messageUsername}
              />
            )
          })
          : <p className='w-full text-center font-semibold text-indigo-400'>There are no messages...</p>
      }
      <span ref={messagesEndRef} />
    </ul>
  )
}
