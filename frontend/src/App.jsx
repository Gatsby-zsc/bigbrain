import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import SignUp from './components/SignUp.jsx'
import Homepage from './components/Homepage.jsx'
import DashBoard from './components/DashBoard.jsx'
import { CustomizedLink } from './components/commonComponents.jsx'
import Play from './components/Play.jsx'
import { ToastContainer } from 'react-toastify'
import Login from './components/LoginAccount.jsx'
import GamePanel from './components/EditGame.jsx'
import EditQuestion from './components/EditQuestion.jsx'
import Lobby from './components/Lobby.jsx'
import backgroundImg from './pictures/background.jpg'
import Box from '@mui/material/Box'
import AdminResults from './components/AdminResults.jsx'
import Gaming from './components/Gaming.jsx'
import HistoryPanel from './components/History.jsx'
import Grid from '@mui/material/Grid'
import SessionResults from './components/SessionResults.jsx'
import Logo from './components/Logo.jsx'
import PlayerResults from './components/PlayerResults.jsx'

const Start = () => {
  return (
    <Container maxWidth='sm'>
      <Container maxWidth='sm' sx={ { pt: 30 } }>
        <Logo />
      </Container>
      <Container sx={ { mt: 2 } }>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CustomizedLink to={'/login'}>
              <Button fullWidth variant='contained'>
                  Login
              </Button>
            </CustomizedLink>
          </Grid>
          <Grid item xs={4}>
            <CustomizedLink to={'/signup'}>
              <Button fullWidth variant='contained'>
                  SignUp
              </Button>
            </CustomizedLink>
          </Grid>
          <Grid item xs={4}>
            <CustomizedLink to={'/play'}>
              <Button fullWidth variant='contained'>
                Play
              </Button>
            </CustomizedLink>
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}

function App () {
  const [refresh, setRefresh] = useState(true)
  const [eachQuestionPoint, setEachQuestionPoint] = useState([])
  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundImage: `url(${backgroundImg})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      backgroundSize: '2500px',
    }}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<Start/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/play/lobby/:sessionId/:nickname/:playerId' element={<Lobby />} />
          <Route path='/play' element={<Play/>} >
            <Route path=':sessionId' element={<Play/>}/>
          </Route>
          <Route path='/play/sessionId/:sessionId/:nickname/:playerId' element={<Gaming value={eachQuestionPoint} function={setEachQuestionPoint}/>} />
          <Route path='/homepage' element={<Homepage value={refresh} function={setRefresh}/>} >
            <Route path='dashboard' element={<DashBoard value={refresh} function={setRefresh} />} />
            <Route path='dashboard/history/:quizId' element={<HistoryPanel/>}/>
            <Route path='dashboard/:quizId' element={<GamePanel />}/>
            <Route path='dashboard/:quizId/:questionId' element={<EditQuestion />}/>
          </Route>
          <Route path='/ongoing/:quizId/:sessionId' element={<AdminResults/>}/>
          <Route path='/results/session/:sessionId' element={<SessionResults/>} />
          <Route path='/results/player/:playName/:playerId' element={<PlayerResults value={eachQuestionPoint}/>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Box>
  )
}

export default App
