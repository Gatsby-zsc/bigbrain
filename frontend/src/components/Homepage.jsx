import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Outlet, useLocation } from 'react-router-dom';
import { AppBar } from '@mui/material';
import { styled } from '@mui/system';
import Logout from './buttons/Logout.jsx';
import DashBoardButton from './buttons/DashBoardButton.jsx';
import HomepageButton from './buttons/HomepageButton.jsx';
import CreateGameButton from './buttons/CreateGame.jsx';
import Logo from './Logo.jsx';

const ToolBarModified = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'end',
});

function Homepage (props) {
  const setRefresh = props.function;
  const refresh = props.value;

  const token = localStorage.getItem('token');

  const path = useLocation()
    .pathname.split('/')
    .filter((path) => {
      return path !== '';
    });

    const currentLocation = path[path.length - 1];

  return (
    <>
      <AppBar position='relative'>
        <ToolBarModified>
          {token && currentLocation === 'dashboard'
            ? (
            <>
              <CreateGameButton value={refresh} function={setRefresh} />
              <HomepageButton />
            </>
              )
            : (
            <>
              <DashBoardButton />
              <HomepageButton />
            </>
              )}
          <Logout />
        </ToolBarModified>
      </AppBar>
      {currentLocation === 'homepage' && (
        <Container maxWidth='sm' sx={{ mt: 35 }}>
          <Logo />
        </Container>
      )}
      <Container>
        {token
          ? (
          <>
            {currentLocation === 'homepage'
              ? <Typography
                variant='h6'
                sx={{ textAlign: 'center', color: '#1876d1' }}
              >
                Please go to Dashboard
              </Typography>
              : ''}
            <br />
            <Outlet />
          </>
            )
          : (
          <Typography
            variant='h6'
            sx={{ textAlign: 'center', color: '#1876d1' }}
          >
            You haven&rsquo;t login, please go to the login page
          </Typography>
            )}
      </Container>
    </>
  );
}

export default Homepage;
