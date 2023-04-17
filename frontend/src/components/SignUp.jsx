import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPOST } from '../library/fetch.js';
import { WindowBorder } from './commonComponents.jsx';
import { failNotify } from '../library/notify.js';

const MyHomeIcon = styled(HomeIcon)({
  margin: '0 auto',
  fontSize: '60px',
});

function SignUp () {
  const navigate = useNavigate();

  const [myEmail, setMyEmail] = useState('');
  const [myName, setMyName] = useState('');
  const [myPassword, setMyPassword] = useState('');

  async function SignUpAccount () {
    // one of the field is entered, no action
    if (myEmail === '' || myPassword === '' || myName === '') {
      failNotify('Please enter all information');
      return;
    }

    const bodyInfo = { email: myEmail, password: myPassword, name: myName };
    const ret = await fetchPOST('admin/auth/register', bodyInfo, 'register');
    if (ret.status === 200) {
      const token = (await ret.json()).token;
      localStorage.setItem('token', token);
      localStorage.setItem('Email', myEmail);
      localStorage.setItem('name', myName);
      navigate('../homepage');
    } else if (ret.status === 400) {
      failNotify('Invalid input or this account has exist');
    }
  }

  function SignUpKey (event) {
    if (event.key === 'Enter') {
      SignUpAccount();
    }
  }

  return (
    <Container maxWidth='xs' onKeyDown={SignUpKey}>
      <Box sx={{ pt: 18 }}>
        <WindowBorder>
          <MyHomeIcon color='primary' />
          <Typography variant='h5' sx={{ mt: 1, textAlign: 'center' }}>
            Sign up
          </Typography>
          <Typography variant='subtitle2' sx={{ mt: 1, mb: 2 }}>
            Enter your name
          </Typography>
          <TextField
            name='name'
            variant='outlined'
            fullWidth
            label='Name'
            onChange={(e) => {
              setMyName(e.target.value)
            }}
          />
          <Typography variant='subtitle2' sx={{ mt: 2, mb: 2 }}>
            Enter your Email
          </Typography>
          <TextField
            name='email'
            variant='outlined'
            label='Email'
            fullWidth
            onChange={(e) => {
              setMyEmail(e.target.value)
            }}
          />
          <Typography variant='subtitle2' sx={{ mt: 2, mb: 2 }}>
            Enter your Password
          </Typography>
          <TextField
            name='password'
            variant='outlined'
            type='password'
            label='Password'
            fullWidth
            onChange={(e) => {
              setMyPassword(e.target.value)
            }}
          />
          <Button
            name='sign-up-submit-btn'
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={SignUpAccount}
            fullWidth
          >
            Sign Up
          </Button>
          <Box sx={ { textAlign: 'end', pr: 1 }}>
            <Link
              to='../login'
              variant='body1'
            >
              Back to login in
            </Link>
          </Box>
        </WindowBorder>
      </Box>
    </Container>
  );
}

export default SignUp;
