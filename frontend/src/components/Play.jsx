import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { fetchPost, fetchGET } from '../library/fetch.js';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { failNotify } from '../library/notify.js';
import Logo from './Logo.jsx';
import SyncIcon from '@mui/icons-material/Sync';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import humans from '../library/human.js'

const PlayStyle = styled('div')({
  width: 320,
  height: 338,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  paddingTop: 40,
});

function Play () {
  const location = useParams();
  const navigate = useNavigate();
  const [playInfo, setPlayInfo] = React.useState('id');
  const [sessionId, setSessionId] = React.useState('');
  const [nickName, setNickName] = React.useState('');

  // pre-populate sessionid if we use url shared by admin
  useEffect(() => {
    if (location.sessionId) {
      setSessionId(location.sessionId);
    }
  }, []);

  // check whether we can join game
  async function connect () {
    const bodyInfo = { name: nickName };
    // if we haven't enter nickname, ask user for that
    if (!nickName) {
      failNotify('Please enter the nickname.');
      return;
    }

    // get playId assigned by admin
    const ret = await fetchPost(`play/join/${sessionId}`, bodyInfo);

    // session is not active
    if (ret.error) {
      failNotify(ret.error);
      setTimeout(() => {
        setNickName('');
        setPlayInfo('id');
      }, 1000);
      return;
    }

    // session is active, we check whether we can join lobby
    if (ret.playerId) {
      const start = await fetchGET(`play/${ret.playerId}/status`, 'no token');
      if (start.started) {
        failNotify('Game has started, you can not join this session ');
      } else {
        // redirect user to lobby and wait for game to start
        navigate(`/play/lobby/${sessionId}/${nickName}/${ret.playerId}`);
      }
    }
  }

  // if we enter a session id, ask player to enter their own nickname
  function enterSession () {
    if (!sessionId) {
      failNotify('Please enter the session ID.');
    } else {
      setPlayInfo('name');
      navigate('/play/' + sessionId);
    }
  }

  function getRandomName () {
    const index = Math.trunc(Math.random() * 200);
    const randomName = humans[index];
    setNickName(randomName);
  }

  function enterSessionKey (event) {
    if (event.key === 'Enter') {
      enterSession();
    }
  }

  function connectKey (event) {
    if (event.key === 'Enter') {
      connect();
    }
  }

  return (
    <Box
      sx={{
        width: '100wh',
        height: '100vh',
      }}
    >
      <PlayStyle>
        <Box>
          <Logo />
        </Box>
        <main>
          {playInfo === 'id'
            ? (
            <>
              <Box
                sx={{
                  mt: 1,
                  width: 320,
                  p: 2,
                  boxShadow: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  position: 'relative'
                }}
              >
                <TextField
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                  onKeyDown={enterSessionKey}
                  placeholder='Enter Session ID'
                />
                <Button
                  onClick={enterSession}
                  variant='contained'
                  size='large'
                  sx={{ mt: 1 }}
                >
                  Enter
                </Button>
              </Box>
              <Box sx={ { display: 'flex', justifyContent: 'center', mt: 1 } }>
                <Link to='/'>
                  Back
                </Link>
              </Box>
            </>
              )
            : (
            <>
              <Box
                sx={{
                  mt: 1,
                  width: 320,
                  p: 2,
                  boxShadow: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                }}
              >
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={getRandomName}
                          edge="end"
                        >
                          <SyncIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    value={nickName}
                    onChange={(e) => setSessionId(e.target.value)}
                    onKeyDown={connectKey}
                    placeholder='Nickname'
                  />
                </FormControl>
                <Button
                  onClick={connect}
                  variant='contained'
                  size='large'
                  sx={{ mt: 1 }}
                >
                  OK, go!🚀
                </Button>
              </Box>
              <Box sx={ { display: 'flex', justifyContent: 'center', mt: 1 } }>
                <Link to='/'>
                  Back
                </Link>
              </Box>
            </>
              )}
        </main>
      </PlayStyle>
    </Box>
  );
}

export default Play;
