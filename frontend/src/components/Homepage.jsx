import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Outlet, useLocation } from 'react-router-dom'
import { AppBar } from '@mui/material'
import { styled } from '@mui/system'
import Logout from './buttons/Logout.jsx'
import DashBoardButton from './buttons/DashBoardButton.jsx'
import HomepageButton from './buttons/HomepageButton.jsx'
import CreateGameButton from './buttons/CreateGame.jsx'

const ToolBarModified = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'end'
})

function Homepage (props) {
  const token = localStorage.getItem('token')
  const path = useLocation()
    .pathname.split('/')
    .filter((path) => {
      return path !== ''
    })
  const currentLocation = path[path.length - 1]

  const setRefresh = props.function
  const refresh = props.value

  return (
    <>
      <AppBar position='relative'>
        <ToolBarModified>
          {token
            ? (
                currentLocation === 'dashboard'
                  ? (
                      <>
                        <HomepageButton />
                        <CreateGameButton value={refresh} function={setRefresh}/>
                      </>
                    )
                  : (
                      <>
                        <HomepageButton />
                        <DashBoardButton />
                      </>
                    )
              )
            : (
                <></>
              )}
          <Logout />
        </ToolBarModified>
      </AppBar>
      <Container>
        {token
          ? (
              <Typography variant='h6' sx={{ textAlign: 'center' }}>
                {currentLocation === 'homepage' ? 'This is Homepage!!!' : ''}
                <br />
                <Outlet />
              </Typography>
            )
          : (
              <Typography variant='h6' sx={{ textAlign: 'center' }}>
                You haven&rsquo;t login, please go to the login page
              </Typography>
            )}
      </Container>
    </>
  )
}

export default Homepage
