import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Grid,
  FormControl,
  TextField,
  Box,
  Button,
  Autocomplete,
} from '@mui/material'

import listRooms from '../../helper/listRooms'

export default function Home() {
  const [user, setUser] = useState('')
  const [room, setRoom] = useState(null)

  const navigate = useNavigate()

  async function handleSubmitForm() {
    clearForm()
    navigate(`/chat?user=${user}&room=${room.value}`)
  }

  function clearForm() {
    setUser('')
    setRoom(null)
  }

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh', marginTop: '-300px' }}
    >
      <Grid item xs={3}>
        <Box style={{ width: '350px' }}>
          <FormControl fullWidth>
            <TextField
              label="User"
              variant="outlined"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              style={{ margin: '30px 0' }}
            />
          </FormControl>
          <FormControl fullWidth>
            <Autocomplete
              disablePortal
              options={listRooms}
              renderInput={(params) => <TextField {...params} label="Rooms" />}
              value={room}
              onChange={(event, room) =>
                room !== null ? setRoom(room) : setRoom(null)
              }
            />
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleSubmitForm()}
        >
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button variant="outlined" color="error" onClick={() => clearForm()}>
          Clear
        </Button>
      </Grid>
    </Grid>
  )
}
