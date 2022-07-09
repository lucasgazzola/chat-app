import { Typography } from '@material-tailwind/react'

export default function MessageItem({ message, username, isCurrentUser }) {

  const MESSAGE_STYLE = {
    backgroundColor: isCurrentUser ? '#005C4B' : '#202C33',
    width: 'max-content',
    maxWidth: '50%',
    overflowWrap: 'break-word'
  }

  return (
    <li
      className={'w-full message-container flex flex-col'}
    >
      <Typography
        className={`text-indigo-50 border-2 rounded-md px-2 py-1 
                  ${isCurrentUser ? 'self-end' : 'self-start'}`}
        variant='paragraph'
        style={MESSAGE_STYLE}
      >
        {message}
      </Typography>
      <Typography
        className={`w-min ${isCurrentUser ? 'self-end' : 'self-start'}`}
        variant='small'
      >
        {username}
      </Typography>
    </li>
  )
}
