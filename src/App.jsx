import { useContext, lazy, Suspense } from 'react'
import { LoggedInContext } from './context/LoggedInContext'


import Loading from './common/components/Loading'
const ChatRoom = lazy(() => import('./pages/ChatRoom'))
const Login = lazy(() => import('./pages/Login'))

export default function App() {
  const { isLoggedIn } = useContext(LoggedInContext)


  return (
    <div className="bg-indigo-100 flex items-center justify-center w-screen h-screen">
      {
        isLoggedIn
          ? (
            <Suspense fallback={<Loading />}>
              <ChatRoom />
            </Suspense>
          )
          : (
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          )
      }
    </div>
  )
}
