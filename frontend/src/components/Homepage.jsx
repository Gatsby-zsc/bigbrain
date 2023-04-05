import React, { useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom'
import { AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
// import Typography from '@mui/material/Typography';

const LinkInButton = styled(Link)({
  textDecoration: 'none',
  color: 'white',
  display: 'block',
  paddingLeft: '4px'
});

const ToolBarModified = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'end'
});

function Homepage () {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // prevent user changing url to enter homepage
  useEffect(() => {
    if (token === null) {
      navigate('../login')
    }
  })

  return (
    <>
      {token
        ? <>
            <AppBar position='relative'>
                <ToolBarModified>
                  <Button variant='contained'>
                    <LogoutIcon />
                    <LinkInButton to='../login' >
                      Logout
                    </LinkInButton>
                  </Button>
                </ToolBarModified>
              </AppBar>
              This is Homepage!!!
              <Outlet />
          </>
        : navigate('../login')
      }
    </>
  )
}

export default Homepage;
