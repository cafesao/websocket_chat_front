import { useEffect, useState } from 'react'
import {
  Grid,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  TextField,
  Box,
  Button,
  Autocomplete,
} from '@mui/material'

import listRooms from '../../helper/listRooms'

export default function Home() {
  const [user, setUser] = useState('')
  const [room, setRoom] = useState('')

  async function handleSubmitForm() {
    console.log(`User: ${user}`)
    console.log(`Room: ${room}`)
    clearForm()
  }

  function clearForm() {
    setUser('')
    setRoom('')
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
            />
            {/* <Select
              value={room}
              label="Room"
              onChange={(e) => setRoom(e.target.value)}
            >
              <MenuItem value={'nodejs'}>NodeJS</MenuItem>
              <MenuItem value={'python'}>Python</MenuItem>
              <MenuItem value={'ruby'}>Ruby</MenuItem>
            </Select> */}
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
