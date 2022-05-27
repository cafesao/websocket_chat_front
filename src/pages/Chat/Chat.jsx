import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import io from 'socket.io-client'

export default function Chat() {
  const [socket, setSocket] = useState(null)
  const [user, setUser] = useState('')
  const [room, setRoom] = useState('')
  const location = useLocation().search

  useEffect(() => {
    const newSocket = io(`http://localhost:3000`, { transports: ['websocket'] })
    newSocket.on('connect', () => {
      console.log('Connected to server')
    })
    setSocket(newSocket)
  }, [])

  useEffect(() => {
    const queryString = new URLSearchParams(location)
    setUser(queryString.get('user'))
    setRoom(queryString.get('room'))
  }, [location])

  // useEffect(() => {
  //   if (socket) {
  //     socket.emit('join', { user, room })
  //   }
  // })

  useEffect(() => {
    console.log(`User: ${user} & Room: ${room}`)
  }, [user, room])

  return <div>Chat</div>
}
