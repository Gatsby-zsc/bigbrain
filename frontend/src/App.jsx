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
import backgroundImg from './components/background.jpg'
import Box from '@mui/material/Box'

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
      backgroundImage: `url(${backgroundImg})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      opacity: 1,
      pt: 0,
      height: '100vh'
    }}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<Start/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/play/lobby/:sessionId' element={<Lobby />} />
          <Route path='/play' element={<Play/>} >
            <Route path=':sessionId' element={<Play/>} />
          </Route>
          <Route path='/homepage' element={<Homepage value={refresh} function={setRefresh}/>} >
            <Route path='dashboard' element={<DashBoard value={refresh} function={setRefresh} />} />
            <Route path='dashboard/:quizId/:questionId' element={<EditQuestion />}/>
            <Route path='dashboard/:quizId' element={<GamePanel />}/>
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Box>
  )
}

export default App
