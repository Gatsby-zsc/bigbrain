import React from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import HomeIcon from '@mui/icons-material/Home'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'
import { fetchPOST } from '../library/fetch.js'
import { WindowBorder } from './commonComponents.jsx'
import { failNotify } from '../library/notify.js'

const MyHomeIcon = styled(HomeIcon)({
  margin: '0 auto',
  fontSize: '60px'
})

function Login () {
  // change color of home icon
  const changeColor = () => {
    // console.log('enter icon');
  }

  // trying to get email and password from local storage
  // (we click remember me last time when we login in)
  const email = localStorage.getItem('rememberEmail') ? localStorage.getItem('rememberEmail') : ''
  const password = localStorage.getItem('rememberPassword') ? localStorage.getItem('rememberPassword') : ''
  const checked = localStorage.getItem('rememberInfo')

  if (checked !== 'true') {
    localStorage.clear()
  }

  const navigate = useNavigate()

  async function LoginAccount (event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const myEmail = data.get('email')
    const myPassword = data.get('password')
    const checked = data.get('remember')

    // no email or password enter, no action
    if (myEmail === '' || myPassword === '') {
      return
    }

    const bodyInfo = { email: myEmail, password: myPassword }
    const ret = await fetchPOST('admin/auth/login', bodyInfo, 'login')
    if (ret.status === 200) {
      const token = (await ret.json()).token
      // process userInfo based
      localStorage.setItem('token', token)
      localStorage.setItem('Email', myEmail)
      if (checked) {
        localStorage.setItem('rememberEmail', myEmail)
        localStorage.setItem('rememberPassword', myPassword)
        localStorage.setItem('rememberInfo', 'true')
      } else {
        localStorage.removeItem('rememberEmail')
        localStorage.removeItem('rememberPassword')
        localStorage.removeItem('rememberInfo')
      }
      navigate('../homepage')
    } else if (ret.status === 400) {
      failNotify('Invalid account !')
    } else {
      failNotify('Invalid account !')
    }
  }

  return (
    <>
      <Container
        component='form'
        onSubmit={LoginAccount}
        maxWidth='xs'
      >
        <Box sx={ { pt: 25 } }></Box>
        <WindowBorder>
          <MyHomeIcon
            color="primary"
            onMouseEnter={changeColor}
          />
          <Typography
            variant='h5'
            sx={ { mt: 1, textAlign: 'center' } }
          >
            Login in
          </Typography>
          <Typography
            variant='subtitle2'
            sx={ { mt: 2, mb: 2 } }
          >
            Enter your Email
          </Typography>
          <TextField
            name='email'
            label='Email'
            variant='outlined'
            defaultValue={email}
            fullWidth
          />
          <Typography
            variant='subtitle2'
            sx={ { mt: 2, mb: 2 } }
          >
            Enter your Password
          </Typography>
          <TextField
            name='password'
            label='Password'
            variant='outlined'
            defaultValue={password}
            type='password'
            fullWidth
          />
          <Box
            sx={ { mt: 1, width: '100%', display: 'flex', justifyContent: 'space-between' } }
          >
            <FormControlLabel
              name="remember"
              control=
              {
                <Checkbox color='primary' defaultChecked={ checked === 'true'} />
              }
              label='Remember me'
            />
            <Typography
              variant='subtitle2'
              sx={ { textAlign: 'center', paddingTop: '10px' } }
            >
              <Link to="#" variant="body2" color='primary'>
                  Forgot password?
              </Link>
            </Typography>
          </Box>
          <Button
            type='submit'
            variant='contained'
            sx={ { mt: 1, mb: 2 } }
            fullWidth
          >
            Sign in
          </Button>
          <Box
            sx={ { mb: 1, width: '100%', display: 'flex', justifyContent: 'space-between' } }
          >
            <Typography variant='body1'>
              Don&apos; t have an account?
            </Typography>
            <Box sx={ { mr: 1 } }>
              <Link to='../signup' variant='body1' color='primary'>
                Sign Up
              </Link>
            </Box>
          </Box>
        </WindowBorder>
      </Container>
    </>
  )
}

export default Login
