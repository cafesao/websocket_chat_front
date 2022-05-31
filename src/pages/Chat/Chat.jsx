import { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Grid,
  Box,
  FormControl,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material'
import io from 'socket.io-client'

export default function Chat() {
  const scrollRef = useRef(null)
  const [socket, setSocket] = useState(null)
  const [user, setUser] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [receivedMessage, setReceivedMessage] = useState([])
  const location = useLocation().search
  const navigate = useNavigate()

  function setInfo(paramUser, paramRoom) {
    setUser(paramUser)
    setRoom(paramRoom)
  }

  function handleSendMessage() {
    if (message !== '') {
      socket.emit('sendMessage', {
        username: user,
        room,
        message,
      })
      setMessage('')
    }
  }

  function handleMessage(username, message) {
    setReceivedMessage((receivedMessage) => [
      ...receivedMessage,
      `${username}: ${message} \n`,
    ])
  }

  useEffect(() => {
    if (socket) {
      socket.on('sendMessage', (data) => {
        handleMessage(data.username, data.message)
        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({
            behavior: 'smooth',
          })
        }
      })
    }
  }, [socket])

  function handleLogout() {
    if (socket) {
      socket.close()
    }
    navigate('/')
  }

  useEffect(() => {
    const newSocket = io(`http://localhost:3000`, { transports: ['websocket'] })
    setSocket(newSocket)
  }, [])

  useEffect(() => {
    const queryString = new URLSearchParams(location)
    const queryUser = queryString.get('user')
    const queryRoom = queryString.get('room')
    setInfo(queryUser, queryRoom)
    if (socket) {
      socket.emit('join', {
        username: queryUser,
        room: queryRoom,
      })
      socket.on('join', (data) => {
        if (data.messages.length > 0) {
          data.messages.map((message) =>
            handleMessage(message.username, message.message)
          )
        }
      })
    }
  }, [socket])

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh', marginTop: '-100px' }}
    >
      <Grid item xs={3}>
        {user}
      </Grid>
      <Grid item xs={3}>
        <Box style={{ width: '350px' }}>
          <FormControl fullWidth>
            <Paper style={{ maxHeight: 400, minHeight: 400, overflow: 'auto' }}>
              <List>
                {receivedMessage.map((message, index) => (
                  <ListItem index={index}>
                    <ListItemText primary={message} />
                  </ListItem>
                ))}
                <ListItem ref={scrollRef} style={{ height: 40 }} />
              </List>
            </Paper>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-flexible"
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={({ code, target }) =>
                code === 'Enter' || code === 'NumpadEnter'
                  ? handleSendMessage()
                  : null
              }
              defaultValue={message}
              value={message}
            />
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={3}>
        <Button variant="outlined" color="error" onClick={() => handleLogout()}>
          Logout
        </Button>
      </Grid>
    </Grid>
  )
}
