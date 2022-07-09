
export default function useLocalStorage() {
  const username = localStorage.getItem('username')
  const chatroomNumber = localStorage.getItem('chatroomNumber')
  const messages = localStorage.getItem('messages')

  return { username, chatroomNumber, messages }
}
