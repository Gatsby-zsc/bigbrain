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
          {token &&
            currentLocation === 'dashboard'
            ? (
                <>
                  <CreateGameButton value={refresh} function={setRefresh}/>
                  <HomepageButton />
                </>
              )
            : (
                <>
                  <DashBoardButton />
                  <HomepageButton />
                </>
              )
          }
          <Logout />
        </ToolBarModified>
      </AppBar>
      { currentLocation === 'homepage' &&
        <Container maxWidth='sm' sx={ { mt: 30 } }>
          <svg viewBox="0 0 440 150" y="0px" x="0px" transform='scale(0.8)'>
            <path d="M226.8,52.5c-18.7,0.3-34.8,16.1-36,35.1c-1.1,19.1,14.1,36.1,33.9,38.1c19.9,2,36-13.8,36-35.1 C260.7,69.2,245.5,52.2,226.8,52.5z M240.2,92c-0.8,9.9-7,15.3-11.1,15.7c-10.3,1.2-19.1-8.1-18.5-20s5.4-19.3,15.1-19.5 C235.4,68,241.3,79.1,240.2,92z" fill="#1876d1"></path>
            <path d="M300.3,54.4c-18.7-0.3-33.9,16.7-33.9,38.1s16.1,37.1,36,35.1c19.9-2,35.1-19,33.9-38.1 C335.2,70.5,319.1,54.8,300.3,54.4z M298,109.7c-4.1-0.5-10.2-5.9-11.1-15.7c-1.1-12.9,4.8-24,14.5-23.8s14.5,7.6,15.1,19.5 C317.1,101.5,308.3,110.9,298,109.7z" fill="#1876d1"></path>
            <polygon points="82.5,36.6 62.4,28.9 23.2,66.3 23.2,19.6 0,25.5 0,135.2 23.2,136 23,97.6 37.3,83.8 52.4,136  72.9,136 54,67.9" fill="#1876d1"></polygon>
            <path d="M146.2,49.2L145.8,0L126,5.2l3.2,121.6l19.5,0.7l-1.1-62.8c4.3-1.9,18.4-5.8,18.9,9.7l1.9,22.1l1.3,31.1 h20.4l-7.7-53.7C179.3,42.5,167.8,42.4,146.2,49.2z" fill="#1876d1"></path>
            <polygon points="415.2,128.2 409.5,141.6 421.7,150 433.7,142.9 428.6,128.2" fill="#1876d1"></polygon>
            <path d="M363.4,19.6l-15.5-6.4v32.1l-17.3-0.6l3.3,22.8h14l1,54.3c0,0-2.2,19.5,27.6,15.1c0,0,9.3-2.8,9-9.3v-21.4 c0,0-6.3,3.7-13.1,3.7c-6.8,0-6.9-3.3-6.9-3.3l-1.8-42l21.7-1.2V49.5L363.1,48L363.4,19.6z" fill="#1876d1"></path>
            <polygon points="440,19.8 399,12 424.2,120.5" fill="#1876d1"></polygon><path d="M77.6,49.9L83,64.1c13.5-8.1,21.1,0,21.1,0l-0.1,9.1c-40.2,7.1-30,44.3-30,44.3 c4.1,14.6,17.3,14.1,17.3,14.1h30.1l0.6-67.7C117.3,32.4,77.6,49.9,77.6,49.9z M104,118.6c0,0-14.6,3.5-16.2-10.7 c0,0,0.3-22,16.7-19.6L104,118.6z" fill="#1876d1"></path>
          </svg>
        </Container>
      }
      <Container>
        {token
          ? (
              <Typography variant='h6' sx={{ textAlign: 'center', color: '#1876d1' }}>
                {currentLocation === 'homepage' ? 'Please go to Dashboard' : ''}
                <br />
                <Outlet />
              </Typography>
            )
          : (
              <Typography variant='h6' sx={{ textAlign: 'center', color: '#1876d1' }}>
                You haven&rsquo;t login, please go to the login page
              </Typography>
            )}
      </Container>
    </>
  )
}

export default Homepage
