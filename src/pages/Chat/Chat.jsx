import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import io from 'socket.io-client'

export default function Chat() {
  const [socket, setSocket] = useState(null)
  const [user, setUser] = useState('')
  const [room, setRoom] = useState('')
  const location = useLocation().search

  function setInfo(paramUser, paramRoom) {
    setUser(paramUser)
    setRoom(paramRoom)
  }

  useEffect(() => {
    const newSocket = io(`http://localhost:3000`, { transports: ['websocket'] })
    newSocket.on('connect', () => {
      console.log('Connected to server')
    })
    setSocket(newSocket)
  }, [])

  useEffect(() => {
    const queryString = new URLSearchParams(location)
    const queryUser = queryString.get('user')
    const queryRoom = queryString.get('room')
    setInfo(queryUser, queryRoom)
    if (socket) {
      socket.emit('join', { queryUser, queryRoom })
    }
  }, [socket])

  return <div>Chat</div>
}
