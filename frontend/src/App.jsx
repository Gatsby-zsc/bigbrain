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

const Start = () => {
  return (
    <>
    <Container sx={ { pt: 10 } }>
      <Button variant='contained'>
        <CustomizedLink
          to={'/login'}
        >
          Go to Login
        </CustomizedLink>
      </Button>
      <Button variant='contained' sx={ { ml: 5 } }>
        <CustomizedLink
          to={'/signup'}
        >
          Go to SignUp
        </CustomizedLink>
      </Button>
      <Button variant='contained' sx={ { ml: 5 } }>
        <CustomizedLink
          to={'/homepage'}
        >
          Go to HomePage
        </CustomizedLink>
      </Button>
      <Button variant='contained' sx={ { ml: 5 } }>
        <CustomizedLink
          to={'/play'}
        >
          Play Now
        </CustomizedLink>
      </Button>
      <Button variant='contained' sx={ { ml: 5 } }>
        <CustomizedLink
          to={'/play/lobby/123'}
        >
          Go to Lobby
        </CustomizedLink>
      </Button>
    </Container>
    </>
  )
}

function App () {
  const [refresh, setRefresh] = useState(true)
  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundImage: `url(${backgroundImg})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      backgroundSize: '100%',
    }}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<Start/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/play' element={<Play/>} >
            <Route path='lobby/:sessionId' element={<Lobby />} />
            <Route path=':sessionId' element={<Play/>} />
          </Route>
          <Route path='/play/:sessionId/:playerId' element={<Gaming/>} />
          <Route path='/homepage' element={<Homepage value={refresh} function={setRefresh}/>} >
            <Route path='dashboard' element={<DashBoard value={refresh} function={setRefresh} />} />
            <Route path='dashboard/history/:quizId' element={<HistoryPanel/>}/>
            <Route path='dashboard/:quizId/:questionId' element={<EditQuestion />}/>
            <Route path='dashboard/:quizId' element={<GamePanel />}/>
          </Route>
          <Route path='/ongoing/:quizId' element={<AdminResults/>}/>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Box>
  )
}

export default App
