import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { fetchPost, fetchGET } from '../library/fetch.js';
import { stopQuiz } from '../library/control.js';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CancelIcon from '@mui/icons-material/Cancel';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { failNotify } from '../library/notify.js';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { WindowBorder } from './commonComponents';
import { styled } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import img1 from '../pictures/avatar/1.JPG';
import img2 from '../pictures/avatar/2.JPG';
import img3 from '../pictures/avatar/3.JPG';
import img4 from '../pictures/avatar/4.JPG';
import img5 from '../pictures/avatar/5.JPG';
import img6 from '../pictures/avatar/6.JPG';
import getAvatar from '../library/hashPlayer.js';
import SessionResult from './SessionResults.jsx';

const AdiminWindow = styled(WindowBorder)({
  backgroundColor: 'white',
});

export default function AdminResults () {
  const quizId = useParams().quizId;
  const active = useParams().sessionId;
  const [stage, setStage] = useState(-1);
  const [status, setStatus] = useState(true);
  const [end, setEnd] = useState(false);
  let [results, setResults] = useState([]);
  const [players, setPLayers] = useState([]);
  const [nextQuestion, setNextQuestion] = useState(false);
  const navigate = useNavigate();

  const avatars = [img1, img2, img3, img4, img5, img6];

  // view how many players logging in
  useEffect(async () => {
    const ret = await fetchGET(`admin/session/${active}/status`, 'token');
    const newPlayers = [...ret.results.players];
    setPLayers(newPlayers);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(async () => {
      // we stop updating the list of players after we start the game
      if (end === false) {
        const ret = await fetchGET(`admin/session/${active}/status`, 'token');
        const newPlayers = [...ret.results.players];
        setPLayers(newPlayers);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [end]);

  useEffect(() => {
    setTimeout(() => {
      setNextQuestion(false);
    }, 1000);
  }, [nextQuestion]);

  // advance to next question
  async function advanceStage () {
    if (nextQuestion === true) {
      failNotify(
        'You should advance question between each 1s, to allow player answer your question'
      );
      return;
    }

    if (players.length === 0) {
      failNotify('No players join, you can not advance game');
      return;
    }
    const nowStage = await fetchPost(`admin/quiz/${quizId}/advance`);
    setNextQuestion(true);
    setStage(nowStage.stage);
    if (nowStage.error) {
      failNotify('All Questions have been answered');
      setStatus(false);
    }
    if (nowStage.stage === 0) {
      setEnd(true);
    }
  }

  // check whether we finish game
  useEffect(async () => {
    const ret = await fetchGET(`admin/session/${active}/status`, 'token');
    setStatus(ret.results.active);
    setStage(ret.results.position);
  }, [stage]);

  // retrive result
  useEffect(() => {
    const fetchData = async () => {
      results = await fetchGET(`admin/session/${active}/results`, 'token');
      setResults(results);
    };
    if (!status) {
      fetchData();
    }
  }, [status]);

  const PlayerDivs = players.map((player, index) => {
    return (
      <Grid item xs={3} key={index}>
        <Container>
          <Avatar
            alt='player avatar'
            src={avatars[getAvatar(player)]}
            sx={{ width: 'auto', height: 'auto' }}
          />
          <Typography variant='body2' noWrap align='center'>
            {player}
          </Typography>
        </Container>
      </Grid>
    );
  });

  return (
    <Box
      sx={{
        width: '100wh',
        height: '100vh',
      }}
    >
      {status && (
        <Container maxWidth='sm' sx={{ pt: 10 }}>
          <AdiminWindow>
            {stage === -1
              ? (
              <Typography variant='h5' sx={{ textAlign: 'center', mb: 3 }}>
                <CircularProgress sx={{ mr: 3 }} />
                Waiting for players to join...
              </Typography>
                )
              : (
              <Typography variant='h5' sx={{ textAlign: 'center', mb: 1 }}>
                Game Start
              </Typography>
                )}
            <Grid container spacing={2}>
              {PlayerDivs}
            </Grid>
          </AdiminWindow>
        </Container>
      )}
      {!status && <SessionResult value={active} />}

      <BottomNavigation
        showLabels
        sx={{ width: '100%', position: 'fixed', bottom: 0 }}
      >
        <BottomNavigationAction
          onClick={() => {
            advanceStage();
          }}
          label='NEXT'
          icon={<SkipNextIcon />}
        />
        <BottomNavigationAction
          onClick={() => {
            stopQuiz(quizId);
            setStatus(false);
          }}
          label='STOP'
          icon={<CancelIcon />}
        />
        <BottomNavigationAction
          onClick={() => {
            navigate('/homepage/dashboard/');
          }}
          label='EXIT'
          icon={<ExitToAppIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
