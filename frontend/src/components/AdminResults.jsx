import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { fetchPost, fetchGET } from './library/fetch.js'
import { stopQuiz } from './Quiz.jsx';
import { useNavigate } from 'react-router-dom';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CancelIcon from '@mui/icons-material/Cancel';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { failNotify } from './library/notify.js';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

export default function AdminResults () {
  const quizId = localStorage.getItem('quizId');
  const active = localStorage.getItem('sessionId');
  const [stage, setStage] = React.useState(-1);
  const [status, setStatus] = React.useState(true);
  const [results, setResults] = React.useState([]);
  const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];
  // const players = [];
  const navigate = useNavigate();
  console.log(results)

  // if (stage === -1) {
  //   setInterval(async () => {
  //     const ret = await fetchGET(`admin/session/${active}/status`);
  //     players.push(ret.results.players);
  //     console.log(ret.results.players)
  //   }, 1000);
  // }

  async function advanceStage () {
    const nowStage = await fetchPost(`admin/quiz/${quizId}/advance`)
    setStage(nowStage.stage);
    if (nowStage.error) {
      failNotify('All Questions have been answered');
      setStatus(false);
    }
    console.log(stage)
  }

  useEffect(async () => {
    const ret = await fetchGET(`admin/session/${active}/status`);
    setStatus(ret.results.active);
  }, [stage])

  useEffect(() => {
    const fetchData = async () => {
      const ret = await fetchGET(`admin/session/${active}/results`);
      setResults(ret.results);
    };
    if (!status) {
      fetchData();
    }
  }, [status])

  // const playerDivs = players.map((player, index) =>
  //   <Grid item xs={3} key={index}>{player}</Grid>
  // );

  // if (!status) {
  //   for results[name] in results {
  //     data.push({ name: name, uv: results[name].correct, pv: results[name].incorrect, amt: results[name].score });
  //   }
  // }

  return (
    <Box
    sx={{
      width: '100wh',
      height: '100vh',
    }}
    >
      {stage === -1 && status
        ? (
          <>
            <Container maxWidth='md'>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant='h5' sx={{ textAlign: 'center', mb: 3, mt: 3 }}>
                    <CircularProgress sx={ { mr: 3 } }/>
                      Waiting for players to join...
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </>)
        // ? (players.length === 0
        //     ? <>
        //       <CircularProgress> Waiting for players to join... </CircularProgress>
        //     </>
        //     : <>
        //     <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
        //       {playerDivs}
        //     </Grid>
        //   </>
        //   )
        : (
        <>
      </>)}
      {!status
        ? (
        <>
          <Container sx={{ pt: 30 }} maxWidth='md'>
            <Grid container direction="row" justifyContent="center" spacing={4}>
              <Grid item xs={4}>
                <BarChart width={200} height={250} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </Grid>
              <Grid item xs={4}>
                <BarChart width={200} height={250} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </Grid>
              <Grid item xs={4}>
                <BarChart width={200} height={250} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </Grid>
            </Grid>
          </Container>
        </>
          )
        : (
        <></>
          )}

      <BottomNavigation
      showLabels
      sx={{ width: '100%', position: 'fixed', bottom: 0 }}
      >
        <BottomNavigationAction onClick={() => { advanceStage() }} label="NEXT" icon={<SkipNextIcon />} />
        <BottomNavigationAction onClick={() => { stopQuiz(); setStatus(false) }} label="STOP" icon={<CancelIcon />} />
        <BottomNavigationAction onClick={() => { localStorage.removeItem('sessionId'); localStorage.removeItem('quizId'); navigate('/homepage/dashboard/') }} label="EXIT" icon={<ExitToAppIcon />} />
      </BottomNavigation>
    </Box>
  );
}
