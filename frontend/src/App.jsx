import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import SignUp from './components/SignUp.jsx';
import Homepage from './components/Homepage.jsx';
import DashBoard from './components/Dash_Board.jsx';
import { CustomizedLink } from './components/commonComponents.jsx';
import Play from './components/Play.jsx';
import { ToastContainer } from 'react-toastify';
import Login from './components/LoginAccount.jsx';
import 'react-toastify/dist/ReactToastify.css';
import GamePanel from './components/GameInfo.jsx';

const Start = () => {
  return (
    <>
    <Container sx={ { mt: 5, ml: 5 } }>
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
    </Container>
    </>
  );
}

function App () {
  const [refresh, setRefresh] = useState(true);

  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/play' element={<Play/>} />
        <Route path='/homepage' element={<Homepage value={refresh} function={setRefresh}/>} >
          <Route path='dashboard' element={<DashBoard value={refresh} function={setRefresh} />} />
          <Route path='dashboard/:Id' element={<GamePanel />}/>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
