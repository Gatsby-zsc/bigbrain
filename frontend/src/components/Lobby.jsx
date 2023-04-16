import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import { VictoryChart, VictoryAxis, VictoryScatter } from 'victory'
import Grid from '@mui/material/Grid'
import { WindowBorder } from './commonComponents'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Container from '@mui/material/Container'
import FastForwardIcon from '@mui/icons-material/FastForward'
import FastRewindIcon from '@mui/icons-material/FastRewind'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import CircularProgress from '@mui/material/CircularProgress'
import { fetchGET } from '../library/fetch.js'
import { useNavigate, useParams } from 'react-router-dom'
import { failNotify } from '../library/notify'

// generate icons with random shape and colors
function getScatterData (icons) {
  const colors = [
    'red', 'navy', 'chartreuse', 'royalblue',
    'lime', 'yellow', 'fuchsia', 'aqua',
    'darkorange', 'lightgreen', 'orangered', 'tomato',
    'violet', 'cornflowerblue', 'gold', 'orange',
    'turquoise'
  ]
  const symbols = [
    'circle', 'star', 'square', 'triangleUp',
    'triangleDown', 'diamond', 'plus'
  ]
  const array = []
  for (let i = 0; i < icons; i++) {
    array.push(i)
  }
  return array.map((index) => {
    const scaledIndex = Math.floor(index % 7)
    return {
      x: Math.random(),
      y: Math.random(),
      size: Math.floor(Math.random() * 10) + 5,
      symbol: symbols[scaledIndex],
      fill: colors[Math.floor(Math.random() * (colors.length - 1))],
      opacity: 0.8
    }
  })
}

function Lobby () {
  const [icons, setIcons] = useState(0)
  const [state, setState] = useState(getScatterData(0))
  const [speed, setSpeed] = useState(3000)
  const navigate = useNavigate()
  const sessionId = useParams().sessionId;
  const playerId = useParams().playerId;
  const nickname = useParams().nickname;

  // keep fecthing backend to detect whether session has started
  useEffect(() => {
    const interval = window.setInterval(async () => {
      const status = await fetchGET(`play/${playerId}/status`, 'no token')
      // navigate to new window to join active session
      if (status.started) {
        navigate(`/play/sessionId/${sessionId}/${nickname}/${playerId}`)
      } else if (status.error) {
        failNotify('Session has been stopped!')
        navigate('/play')
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setState(getScatterData(icons))
    }, speed)

    return () => clearInterval(interval)
  }, [icons, speed])

  function speedUp () {
    if (speed === 1000) {
      return
    }
    setSpeed(speed - 1000)
  }

  function speedDown () {
    if (speed === 5000) {
      return
    }
    setSpeed(speed + 1000)
  }

  function startGame () {
    setIcons(5)
    setSpeed(3000)
    setState(getScatterData(5))
  }

  function increaseIcon () {
    const newIcons = icons + 1
    setIcons(newIcons)
    setState(getScatterData(newIcons))
  }

  function decreaseIcon () {
    if (icons === 0) {
      return
    }
    const newIcons = icons - 1
    setIcons(newIcons)
    setState(getScatterData(newIcons))
  }

  return (
    <Container maxWidth='md'>
      <Grid container spacing={1}>
        <Grid item xs={12}>
            <Typography variant='h5' textAlign={'center'} sx={{ mb: 3 }}>
              <CircularProgress sx={ { mr: 3, mt: 3 } }/>
              Waiting for start...
            </Typography>
          <WindowBorder>
            <Typography variant='h4' sx={{ textAlign: 'center' }}>
              {icons}
            </Typography>
            <VictoryChart animate={{ duration: speed, easing: 'bounce' }}>
              <VictoryScatter
                data={state}
                style={{
                  data: {
                    fill: ({ datum }) => datum.fill,
                    opacity: ({ datum }) => datum.opacity
                  }
                }}
              />
              <VictoryAxis style={{
                axis: { stroke: 'transparent' },
                ticks: { stroke: 'transparent' },
                tickLabels: { fill: 'transparent' }
              }} />
            </VictoryChart>
            <Grid container spacing={3} sx={ { mb: 2 } }>
              <Grid item xs={6} md={3}>
                <Button fullWidth variant='contained' onClick={increaseIcon} sx={ { mr: 2 } }>
                  <AddIcon sx={ { mr: 1 } }/>
                  increase</Button>
              </Grid>
              <Grid item xs={6} md={3}>
                <Button fullWidth variant='contained' onClick={decreaseIcon}>
                  <RemoveIcon sx={ { mr: 1 } }/>
                  delele</Button>
              </Grid>
              <Grid item xs={6} md={3}>
                <Button fullWidth variant='contained' onClick={speedUp} sx={ { mr: 2 } }>
                  <FastForwardIcon sx={ { mr: 1 } }/>
                  speed up</Button>
              </Grid>
              <Grid item xs={6} md={3}>
                <Button fullWidth variant='contained' onClick={speedDown}>
                  <FastRewindIcon sx={ { mr: 1 } }/>
                  speed down</Button>
              </Grid>
            </Grid>
            <Button fullWidth variant='contained' onClick={startGame}>
              <PlayArrowIcon sx={ { mr: 1 } }/>
              Start
            </Button>
          </WindowBorder>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Lobby
