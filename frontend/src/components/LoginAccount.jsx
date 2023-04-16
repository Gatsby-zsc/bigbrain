import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { fetchPOST } from '../library/fetch.js';
import { WindowBorder } from './commonComponents.jsx';
import { failNotify } from '../library/notify.js';

const MyHomeIcon = styled(HomeIcon)({
  margin: '0 auto',
  fontSize: '60px',
});

function Login () {
  const navigate = useNavigate();

  // try to get email and password from local storage, we click remember me last time when we login in
  const [myEmail, setEmail] = useState(
    localStorage.getItem('rememberEmail')
      ? localStorage.getItem('rememberEmail')
      : '')

  const [myPassword, setPassword] = useState(
    localStorage.getItem('rememberPassword')
      ? localStorage.getItem('rememberPassword')
      : '')

  const [checked, setChecked] = useState(localStorage.getItem('rememberInfo') === 'true')
  async function LoginAccount () {
    // no email or password enter, no action
    if (myEmail === '' || myPassword === '') {
      return;
    }

    // admin didn't click checkbox to remember email and password
    if (!checked) {
      localStorage.clear();
    }

    const bodyInfo = { email: myEmail, password: myPassword };
    const ret = await fetchPOST('admin/auth/login', bodyInfo, 'login');
    if (ret.status === 200) {
      const token = (await ret.json()).token;
      // process userInfo based
      localStorage.setItem('token', token);
      localStorage.setItem('Email', myEmail);
      if (checked) {
        localStorage.setItem('rememberEmail', myEmail);
        localStorage.setItem('rememberPassword', myPassword);
        localStorage.setItem('rememberInfo', 'true');
      } else {
        localStorage.removeItem('rememberEmail');
        localStorage.removeItem('rememberPassword');
        localStorage.removeItem('rememberInfo');
      }
      navigate('../homepage');
    } else if (ret.status === 400) {
      failNotify('Invalid account !');
    } else {
      failNotify('Invalid account !');
    }
  }

  function loginKey (event) {
    if (event.key === 'Enter') {
      LoginAccount();
    }
  }

  return (
    <>
      <Container maxWidth='xs' onKeyDown={loginKey}>
        <Box sx={{ pt: 25 }}>
          <WindowBorder>
            <MyHomeIcon color='primary' />
            <Typography variant='h5' sx={{ mt: 1, textAlign: 'center' }}>
              Login in
            </Typography>
            <Typography
              variant='subtitle2'
              sx={{ mt: 2, mb: 2 }}
              >
              Enter your Email
            </Typography>
            <TextField
              label='Email'
              variant='outlined'
              defaultValue={myEmail}
              fullWidth
              onChange={ (e) => {
                setEmail(e.target.value)
              }}
            />
            <Typography variant='subtitle2' sx={{ mt: 2, mb: 2 }}>
              Enter your Password
            </Typography>
            <TextField
              variant='outlined'
              type='password'
              label='Password'
              defaultValue={myPassword}
              fullWidth
              onChange={ (e) => {
                setPassword(e.target.value)
              }}
            />
            <Box
              sx={{
                mt: 1,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Checkbox
                  color='primary'
                  checked={checked}
                  onChange={ () => {
                    setChecked(!checked)
                  }}
                />
                <Typography
                  variant='subtitle2'
                  sx={ { display: 'inline' } }
                >
                  Remember me
                </Typography>
              </Box>
              <Typography
                variant='subtitle2'
                sx={{ textAlign: 'center', paddingTop: '10px' }}
              >
                <Link to='#' variant='body2' color='primary'>
                  Forgot password?
                </Link>
              </Typography>
            </Box>
            <Button
              variant='contained'
              sx={{ mt: 1, mb: 2 }}
              fullWidth
              onClick={LoginAccount}
            >
              Sign in
            </Button>
            <Box
              sx={{
                mb: 1,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant='body1'>
                Don&apos; t have an account?
              </Typography>
              <Box sx={{ mr: 1 }}>
                <Link to='../signup' variant='body1' color='primary'>
                  Sign Up
                </Link>
              </Box>
            </Box>
          </WindowBorder>
        </Box>
      </Container>
    </>
  );
}

export default Login;
