import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Outlet, useLocation } from 'react-router-dom'
import { AppBar } from '@mui/material';
import { styled } from '@mui/system';
import { CustomizedLink } from './common_components.jsx';
import { fetchPOST } from './library/fetch.js';

const ToolBarModified = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'end'
});

function logout () {
  fetchPOST('admin/auth/logout', {}, true)
  localStorage.removeItem('token');
}

function Homepage () {
  const token = localStorage.getItem('token');
  const path = useLocation().pathname.split('/').filter((path) => { return path !== '' });
  const currentLocation = path[path.length - 1];
  // console.log(currentLocation);
  return (
    <>
      <AppBar position='relative'>
        <ToolBarModified>
          {
            token
              ? currentLocation === 'dashboard'
                ? <Button variant='contained' sx={ { mr: 2 } }>
                  <HomeIcon />
                  <CustomizedLink to='../homepage'>
                    Homepage
                  </CustomizedLink>
                </Button>
                : <Button variant='contained' sx={ { mr: 2 } }>
                    <DashboardIcon />
                    <CustomizedLink to='./dashboard'>
                      Dashboard
                    </CustomizedLink>
                  </Button>
              : <>
                </>
          }
          <Button variant='contained'>
            <LogoutIcon />
            <CustomizedLink to='../' onClick={logout}>
              Logout
            </CustomizedLink>
          </Button>
        </ToolBarModified>
      </AppBar>
      <Container>
      {
        token
          ? <Typography variant='h6'sx={ { textAlign: 'center' } } >
              This is Homepage!!!
              <br/>
              <Outlet />
            </Typography>
          : <Typography variant='h6' sx={ { textAlign: 'center' } } >
              You haven&rsquo;t login, please go to the login page
            </Typography>
      }
      </Container>
    </>
  )
}

export default Homepage;
